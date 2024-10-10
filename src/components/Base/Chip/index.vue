<script setup lang="ts">
interface Props {
  text: string
  isActive: boolean
  activeColor: string
}
defineProps<Props>()
defineEmits(['clickEmit'])
</script>

<template>
  <button
    class="mb-2 mr-2 flex items-center justify-center rounded-full px-3 py-[5px] text-xs"
    :class="[isActive ? [activeColor] : 'bg-gray-100 text-black hover:bg-gray-200']"
    @click="$emit('clickEmit')"
  >
    {{ text }}
  </button>
</template>
