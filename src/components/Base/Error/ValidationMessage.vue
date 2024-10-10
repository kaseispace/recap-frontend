<script setup lang="ts">
interface Props {
  text: string
}
defineProps<Props>()
</script>

<template>
  <p class="mt-1 text-sm font-medium text-red-600">
    {{ text }}
  </p>
</template>
