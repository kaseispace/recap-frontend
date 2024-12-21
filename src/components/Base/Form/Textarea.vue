<script setup lang="ts">
interface Props {
  modelValue: string
  textareaPlaceholder: string
  defaultHeight: string
}
const props = defineProps<Props>()
defineEmits(['update:modelValue'])

const localHeight = ref(props.defaultHeight)
const area = ref<HTMLElement | null>(null)

const styles = computed(() => {
  return localHeight.value
})

const resize = async () => {
  localHeight.value = props.defaultHeight
  await nextTick()
  localHeight.value = area.value?.scrollHeight + 'px'
}

watch(
  () => props.modelValue,
  () => {
    resize()
  }
)

onMounted(async () => {
  await resize()
})
</script>

<template>
  <textarea
    ref="area"
    :value="modelValue"
    :style="{ height: styles }"
    class="w-full resize-none overflow-hidden bg-gray-100 py-3 text-sm outline-none focus:border-b-2 focus:border-blue-900"
    :placeholder="textareaPlaceholder"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
