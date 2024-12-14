<script setup lang="ts">
interface Props {
  schoolName?: string
  titleFont?: string
}

defineProps<Props>()
</script>

<template>
  <div class="sticky top-0 z-20 flex h-12 items-center justify-between border-b bg-white px-5 py-2">
    <div class="flex items-center">
      <slot name="icon" />
      <span
        :class="titleFont ? titleFont : 'text-lg font-medium'"
        data-testId="schoolName"
      >{{ schoolName }}</span>
    </div>
    <div class="text-sm">
      <slot />
    </div>
  </div>
</template>
