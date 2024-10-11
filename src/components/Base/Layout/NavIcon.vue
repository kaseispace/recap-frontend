<script setup lang="ts">
interface Props {
  iconName: string
  pathName: string
  activeBg: string
  inactiveBg: string
}
const props = defineProps<Props>()
const route = useRoute()

const isActive = computed(() => route.name === props.pathName)
</script>

<template>
  <NuxtLink
    data-testId="link"
    :to="{ name: pathName }"
  >
    <div
      data-testId="propsBgColor"
      class="group flex size-10 items-center justify-center rounded-md p-1"
      :class="isActive ? [activeBg] : [inactiveBg]"
    >
      <slot />

      <Icon
        data-testId="icon"
        :name="iconName"
        size="24px"
      />
    </div>
  </NuxtLink>
</template>
