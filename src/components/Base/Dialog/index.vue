<script setup lang="ts">
interface Props {
  title?: string
  wide: 'small' | 'large'
}

const props = defineProps<Props>()
const el = ref<HTMLElement | null>(null)
const { y } = useScroll(el)

const styles = reactive<{
  [key: string]: string
}>({
  small: 'max-w-[450px]',
  large: 'max-w-[700px]'
})

const selectedWide = computed(() => styles[props.wide] || styles.small)

onUpdated(() => {
  if (el.value) {
    y.value = el.value?.scrollHeight
  }
})
</script>

<template>
  <div
    data-testId="propsWide"
    class="relative z-20 flex w-full flex-col justify-start space-y-4 rounded-md bg-white p-4"
    :class="selectedWide"
  >
    <!-- メインコンテンツ -->

    <div class="flex justify-between">
      <h1
        v-if="title"
        data-testId="propsTitle"
        class="mb-1 flex items-center text-xl font-semibold"
      >
        {{ title }}
      </h1>
      <slot name="icon" />
    </div>

    <!-- wideをlargeで指定したときに、スクロールを許可 -->
    <div
      v-if="wide === 'large'"
      ref="el"
      class="dialog-scrollbar flex max-h-[350px] flex-col space-y-4 overflow-y-auto overflow-x-hidden pr-1.5 sm:max-h-[500px]"
    >
      <slot />
    </div>

    <div
      v-else
      class="flex flex-col space-y-4"
    >
      <slot />
    </div>

    <div class="flex justify-end space-x-4 pt-2">
      <slot name="footer" />
    </div>
  </div>
</template>
