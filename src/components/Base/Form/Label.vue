<script setup lang="ts">
interface Props {
  text: string
  inputFor?: string
}
defineProps<Props>()
</script>

<template>
  <label
    :for="inputFor"
    class="mb-2 block text-sm font-semibold text-gray-900"
  >{{ text }}</label>
</template>
