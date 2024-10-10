<script setup lang="ts">
interface Props {
  message: string
}
defineProps<Props>()
</script>

<template>
  <span
    class="pointer-events-none absolute whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-[11px] text-white opacity-0 transition group-hover:opacity-100"
  >{{ message }}</span>
</template>
