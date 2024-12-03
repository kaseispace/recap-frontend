<script setup lang="ts">
interface Props {
  modelValue: string
  textareaPlaceholder: string
  defaultHeight: string
}
const props = defineProps<Props>()
defineEmits(['update:modelValue'])
const localHeight = ref(props.defaultHeight)

// mountされてDOM要素が生成されるまではアクセス出来ないのでnull型
const area = ref<HTMLElement | null>(null)

const styles = computed(() => {
  return localHeight.value
})

const resize = async () => {
  // リサイズ前にリセット
  localHeight.value = props.defaultHeight
  // DOMの更新が完了する前のdefaultHeightを避けるために、更新が完了するのを待つ
  await nextTick()
  localHeight.value = area.value?.scrollHeight + 'px'
}

watch(
  () => props.modelValue,
  () => {
    resize()
  }
)

// DOMのレンダリングが完了し、表示状態になった時点
onMounted(async () => {
  await resize()
})
</script>

<template>
  <textarea
    ref="area"
    :value="modelValue"
    :style="{ height: styles }"
    class="w-full resize-none overflow-hidden bg-gray-100 py-3 text-xs outline-none focus:border-b-2 focus:border-blue-900 xs:text-sm"
    :placeholder="textareaPlaceholder"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
