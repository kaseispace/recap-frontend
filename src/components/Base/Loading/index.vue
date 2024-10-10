<script setup lang="ts">
interface Props {
  iconSize?: 'small' | 'large'
  borderColor: string
}

const props = withDefaults(defineProps<Props>(), {
  iconSize: 'large',
})
</script>

<template>
  <div
    v-if="props.iconSize === 'small'"
    data-testId="propsBorderColor"
    class="size-8 animate-spin rounded-full border-4 border-t-transparent"
    :class="[borderColor]"
  />
  <div
    v-else
    data-testId="propsBorderColor"
    class="size-11 animate-spin rounded-full border-[6px] border-t-transparent"
    :class="[borderColor]"
  />
</template>
