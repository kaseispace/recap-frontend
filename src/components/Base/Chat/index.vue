<script setup lang="ts">
interface Props {
  title: string
  bgColor: string
  isExpanded: boolean
}
defineProps<Props>()
</script>

<template>
  <div
    data-testId="propsIsExpanded"
    class="flex flex-col rounded-sm shadow-2xl"
    :class="isExpanded ? 'h-[75vh] w-[90vw] max-w-screen-xl' : 'h-[570px] w-[370px] max-w-[70vw] max-h-[75vh]'"
  >
    <div
      data-testId="propsBgColor"
      class="flex items-center justify-between rounded-t-sm p-3"
      :class="[bgColor]"
    >
      <span class="font-semibold text-white">{{ title }}</span>
      <slot name="icon" />
    </div>
    <slot />
  </div>
</template>
