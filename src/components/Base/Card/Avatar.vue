<script setup lang="ts">
interface Props {
  bgColor: string
}
defineProps<Props>()
</script>

<template>
  <div
    class="mr-1 flex items-center justify-center rounded-full p-2"
    :class="[bgColor]"
  >
    <slot />
  </div>
</template>
