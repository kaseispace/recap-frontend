<script setup lang="ts">
interface Props {
  text: string
}
defineProps<Props>()
</script>

<template>
  <h1 class="break-all text-xl sm:text-2xl">
    {{ text }}
  </h1>
</template>
