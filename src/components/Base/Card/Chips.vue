<script setup lang="ts">
interface Props {
  text: string
  iconType: 'calendar' | 'timetable'
}
defineProps<Props>()
</script>

<template>
  <div
    data-testId="slotChips"
    class="ml-2 flex"
  >
    <div class="mt-0.5 flex items-center">
      <Icon
        v-if="iconType === 'calendar'"
        data-testId="calendar"
        name="mdi:calendar-month-outline"
        size="12"
      />
      <Icon
        v-else-if="iconType === 'timetable'"
        data-testId="timetable"
        name="mdi:timetable"
        size="12"
      />
    </div>
    <p class="text-xs">
      {{ text }}
    </p>
  </div>
</template>
