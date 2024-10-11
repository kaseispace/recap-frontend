<script setup lang="ts">
interface Props {
  modelValue: string | undefined
  inputId?: string
  inputPlaceholder?: string
  inputType?: string
  wide?: string
}
withDefaults(defineProps<Props>(), {
  inputPlaceholder: '',
  inputId: '',
  inputType: 'text',
  wide: ''
})

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :id="inputId"
    :value="modelValue"
    :placeholder="inputPlaceholder"
    :type="inputType"
    class="block rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
    :class="[wide || 'w-full']"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @keydown.enter.prevent
  >
</template>
