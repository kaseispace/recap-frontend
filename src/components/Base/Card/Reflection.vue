<script setup lang="ts">
interface Props {
  title: string
  date: string
}
defineProps<Props>()
</script>

<template>
  <div class="rounded-lg border border-gray-200 bg-white p-5 shadow">
    <div class="mb-4 flex flex-col justify-start border-b border-gray-200 pb-3">
      <h1 class="mb-1 text-xl">
        {{ title }}
      </h1>
      <p class="text-sm text-gray-500">
        {{ date }}
      </p>
    </div>
    <slot />
  </div>
</template>
