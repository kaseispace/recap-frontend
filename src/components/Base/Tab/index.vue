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
  <li @click="$emit('clickEmit')">
    <a
      href="#"
      class="inline-block whitespace-nowrap border-b-2 p-3"
      :class="[
        isActive ? [activeColor] : 'border-transparent  text-gray-500 hover:border-gray-300 hover:text-gray-900',
      ]"
    >{{ text }}</a>
  </li>
</template>
