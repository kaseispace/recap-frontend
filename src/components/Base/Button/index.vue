<script setup lang="ts">
interface Props {
  text?: string | number
  buttonType: 'none' | 'icon' | 'circle' | 'square' | 'circleNormal' | 'dialog' | 'pagination'
  isEnabled?: boolean | undefined
  isClicked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  isEnabled: undefined,
  isClicked: false
})

const styles = reactive<{
  [key: string]: string
}>({
  none: 'flex items-center justify-center rounded p-2.5 text-sm font-semibold',
  icon: 'flex items-center justify-center rounded p-1',
  circle: 'flex items-center justify-center rounded-full text-sm hover:bg-opacity-75',
  square:
    'my-1 flex items-center justify-center rounded border border-transparent p-1 hover:border-slate-400 hover:bg-slate-100',
  circleNormal: 'flex items-center justify-center rounded-full p-1 hover:bg-slate-200',
  dialog:
    'relative inline-flex items-center justify-center space-x-2 rounded-md border px-2.5 py-1 text-center text-xs hover:bg-slate-100',
  pagination: 'flex items-center justify-center rounded-full p-0.5'
})

const selectedStyle = computed(() => (props.buttonType in styles ? styles[props.buttonType] : styles.none))
</script>

<template>
  <button
    v-if="isEnabled !== undefined"
    :class="[selectedStyle, isEnabled ? '' : 'bg-white']"
    :disabled="isEnabled"
  >
    <slot />
  </button>

  <button
    v-else
    :class="[selectedStyle, { 'cursor-not-allowed': isClicked }]"
    :disabled="isClicked"
  >
    <slot />

    <span v-if="text"> {{ text }}</span>
  </button>
</template>
