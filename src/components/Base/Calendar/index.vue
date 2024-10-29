<script setup lang="ts">
interface Props {
  courseDate?: string
}
const props = defineProps<Props>()

interface Emits {
  (event: 'dateSelected', selectedDate: string): void
}

const emit = defineEmits<Emits>()

const date = ref<Date | null>(null)
const selectedDate = ref('')
const calenderRef = ref(null)

const { isActive: isCalendarActive, openToggle: toggleCalendar } = useToggle()
const closeCalendar = () => (isCalendarActive.value = false)
onClickOutside(calenderRef, closeCalendar)

const today = new Date()
const yesterday = new Date()
yesterday.setDate(today.getDate() - 1)

// どの範囲を選択できなくするか
const disabledDates = ref([{ start: null, end: yesterday }])

watch(date, () => {
  if (date.value) {
    selectedDate.value = date.value.toLocaleDateString()
    emit('dateSelected', selectedDate.value)
  }
  else {
    console.log(date.value)
  }
})

onMounted(() => {
  // propsが渡されている場合は、初期値をセット
  if (props.courseDate) {
    selectedDate.value = props.courseDate
  }
})
</script>

<template>
  <div class="relative">
    <!-- 選択領域 -->
    <div class="flex items-center justify-between rounded border border-gray-300 bg-gray-50 p-2.5 sm:text-sm">
      <span class="text-sm">{{ selectedDate || '選択してください' }}</span>
      <div
        v-if="!isCalendarActive"
        data-testId="clickIcon"
        class="flex cursor-pointer items-center justify-center"
        @click="toggleCalendar"
      >
        <Icon
          name="mdi:calendar-month-outline"
          size="24px"
        />
      </div>

      <div
        v-else
        class="flex cursor-pointer items-center justify-center"
      >
        <Icon
          name="mdi:calendar-month-outline"
          size="24px"
        />
      </div>
    </div>

    <!-- カレンダー表示 -->
    <div
      v-if="isCalendarActive"
      data-testId="invisible"
      class="absolute right-0 top-14 z-20"
    >
      <div ref="calenderRef">
        <client-only>
          <VDatePicker
            v-model="date"
            :disabled-dates="disabledDates"
          />
        </client-only>
      </div>
    </div>
  </div>
</template>
