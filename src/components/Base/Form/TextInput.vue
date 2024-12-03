<script setup lang="ts">
interface Props {
  modelValue: string | undefined
  inputId?: string
  inputPlaceholder?: string
  inputType?: string
  wide?: string
  isBgColor?: boolean
}
withDefaults(defineProps<Props>(), {
  inputPlaceholder: '',
  inputId: '',
  inputType: 'text',
  wide: '',
  isBgColor: true
})

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :id="inputId"
    :value="modelValue"
    :placeholder="inputPlaceholder"
    :type="inputType"
    class="block rounded border border-gray-300 p-2.5 text-sm text-gray-900"
    :class="[wide || 'w-full', isBgColor? 'bg-gray-50': 'bg-white']"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @keydown.enter.prevent
  >
</template>
