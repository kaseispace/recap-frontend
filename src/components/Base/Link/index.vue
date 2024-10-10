<script setup lang="ts">
interface Props {
  text: string
  path: string
}
defineProps<Props>()
</script>

<template>
  <p class="text-sm">
    <NuxtLink :to="{ name: path }">
      {{ text }}
    </NuxtLink>
  </p>
</template>
