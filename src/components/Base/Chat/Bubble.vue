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
  maxWidth: 'max-w-[264px]',
})
</script>

<template>
  <!-- 背景色は利用側で（例：bg-slate-200） -->
  <div
    data-testId="propsBgColor"
    class="relative rounded-lg px-3 py-2"
    :class="[bgColor, maxWidth]"
  >
    <span
      class="text-sm"
      :class="messageType === 'bot' ? 'text-black' : 'text-white'"
    > {{ message }}</span>
    <div
      v-if="isBorder"
      data-testId="propsBorderColor"
      class="absolute top-2 h-0 w-0 origin-center border-[10px] border-transparent"
      :class="[messageType === 'bot' ? 'left-[-10px] rotate-12' : 'right-[-10px] -rotate-12', borderColor]"
    />
  </div>
</template>
