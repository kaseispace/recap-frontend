<script setup lang="ts">
interface Props {
  dialogType?: 'right' | 'left' | 'center'
}

withDefaults(defineProps<Props>(), {
  dialogType: 'center',
})
</script>

<template>
  <div
    :class="{
      'justify-end': dialogType === 'right',
      'justify-start': dialogType === 'left',
      'items-center justify-center': dialogType === 'center',
    }"
    class="fixed left-0 top-0 z-20 flex size-full bg-slate-500/50"
  >
    <slot />
  </div>
</template>
