<script setup lang="ts">
interface Props {
  title: string
  bgColor: string
}
defineProps<Props>()
</script>

<template>
  <div class="flex h-[570px] w-[370px] flex-col rounded-sm shadow-2xl">
    <!-- header(高さを指定しないでタイトルの長さに応じて) -->
    <div
      data-testId="propsBgColor"
      class="flex items-center justify-center rounded-t-sm p-3"
      :class="[bgColor]"
    >
      <span class="font-semibold text-white">{{ title }}</span>
    </div>
    <slot />
  </div>
</template>
