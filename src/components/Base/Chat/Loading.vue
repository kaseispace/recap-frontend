<script setup lang="ts">
interface Props {
  bgColor: string
  borderColor: string
}
defineProps<Props>()
</script>

<template>
  <div
    data-testId="propsBgColor"
    class="relative flex h-10 max-w-[264px] items-end justify-center rounded-lg px-3 py-2"
    :class="[bgColor]"
  >
    <Icon
      name="svg-spinners:3-dots-bounce"
      size="20px"
    />
    <div
      data-testId="propsBorderColor"
      class="absolute left-[-10px] top-2 size-0 origin-center rotate-12 border-[10px] border-transparent"
      :class="[borderColor]"
    />
  </div>
</template>
