<script setup lang="ts">
interface Props {
  notification: ValueText | null
  status: boolean | null
}
const props = defineProps<Props>()
const isSnackbarVisible = ref(false)
const iconStyle = props.status ? 'true' : 'false'

watch(
  () => props.notification,
  (): void => {
    isSnackbarVisible.value = true
    setTimeout(() => {
      isSnackbarVisible.value = false
    }, 5000)
  }
)
</script>

<template>
  <div
    v-if="isSnackbarVisible"
    data-testId="invisible"
    class="fixed right-2 top-2 z-40 max-w-85/100"
  >
    <div
      data-testId="propsStatus"
      class="flex items-center rounded-lg px-4 py-3"
      :class="[status ? 'bg-teal-900' : 'bg-red-500']"
    >
      <div class="flex items-center">
        <Icon
          v-if="!iconStyle"
          name="mdi:alert-circle"
          size="17px"
          style="color: white"
        />
        <Icon
          v-else
          name="mdi:check-circle"
          size="17px"
          style="color: white"
        />
      </div>

      <p class="ml-2 text-base text-white">
        {{ props.notification?.text }}
      </p>
    </div>
  </div>
</template>
