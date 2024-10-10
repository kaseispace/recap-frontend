<script setup lang="ts">
interface Props {
  title: string
  bgColor: string
}
defineProps<Props>()
</script>

<template>
  <div
    data-testId="propsBgColor"
    class="rounded-lg p-5"
    :class="[bgColor]"
  >
    <div class="mb-5 flex flex-col justify-start">
      <h1 class="text-xl">
        {{ title }}
      </h1>
    </div>
    <slot />
  </div>
</template>
