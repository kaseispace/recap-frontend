<script setup lang="ts">
interface Props {
  message: string
  messageType: 'bot' | 'user'
  bgColor: string
  isBorder?: boolean
  borderColor?: string
  maxWidth?: string
}

withDefaults(defineProps<Props>(), {
  isBorder: true,
  borderColor: undefined,
  maxWidth: 'max-w-[264px]'
})
</script>

<template>
  <div
    data-testId="propsBgColor"
    class="relative rounded-lg px-3 py-2"
    :class="[bgColor, maxWidth]"
  >
    <span
      class="break-words text-sm"
      :class="messageType === 'bot' ? 'text-black' : 'text-white'"
    > {{ message }}</span>
    <div
      v-if="isBorder"
      data-testId="propsBorderColor"
      class="absolute top-2 size-0 origin-center border-[10px] border-transparent"
      :class="[messageType === 'bot' ? 'left-[-10px] rotate-12' : 'right-[-10px] -rotate-12', borderColor]"
    />
  </div>
</template>
