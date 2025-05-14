<script setup lang="ts">
interface Props {
  name: string
  description: string[]
  imagePath: string
  isImageFirst: boolean
}

defineProps<Props>()

const { width } = useWindowSize()

const isMobile = computed(() => width.value < 863)
</script>

<template>
  <div
    class="flex flex-col gap-y-4 rounded-2xl bg-[#F2F3F7] p-6 md2:flex-row md2:gap-x-6 md2:gap-y-0 md2:p-8"
    :class="{ 'md2:flex-row-reverse': !isImageFirst }"
  >
    <div
      class="flex items-center justify-center"
      :class="{ 'order-2': isMobile }"
    >
      <NuxtImg
        format="webp"
        provider="cloudinary"
        :src="imagePath"
        class="w-full max-w-none rounded-lg bg-white p-4 sm:w-[432px] lg:w-[532px] "
      />
    </div>

    <div
      class="flex w-full flex-col gap-x-6"
      :class="{ 'order-1': isMobile }"
    >
      <h3 class="pb-3 text-xl font-semibold text-[#057767] md2:pb-6 md2:text-2xl">
        {{ name }}
      </h3>

      <ul class="space-y-2">
        <li
          v-for="(desc, index) in description"
          :key="index"
          class="text-sm font-medium leading-[24px] md2:text-[16px] md2:leading-[26px]"
        >
          {{ desc }}
        </li>
      </ul>
    </div>
  </div>
</template>
