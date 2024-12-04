<script setup lang="ts">
interface Props {
  content: string
  dateTime: string
  isEdited: boolean
}
const props = defineProps<Props>()

const timeAgo = useTimeAgo(new Date(props.dateTime))
const timeAgoText = ref('')
const timeUnits = {
  just: '今',
  minute: '分前',
  hour: '時間前',
  yesterday: '昨日',
  days: '日前',
  week: '週間前',
  month: 'か月前',
  year: '年前'
}

// propsで渡された値を任意の形式として表示できるようにする
const timeCheck = () => {
  let numberPart = ''
  for (const [key, value] of Object.entries(timeUnits)) {
    if (timeAgo.value.includes(key)) {
      if (timeAgo.value.includes('last')) {
        numberPart = '1'
      }
      else {
        const match = timeAgo.value.match(/\d+/)
        numberPart = match ? match[0] : ''
      }
      timeAgoText.value = key === 'just' || key === 'yesterday' ? value : numberPart + value
      return
    }
  }
}

watch(timeAgo, timeCheck)
onMounted(timeCheck)
</script>

<template>
  <div class="relative mb-4 flex justify-between rounded-md border p-3">
    <div class="flex flex-col text-sm">
      <div class="mb-2 flex text-gray-500">
        <p
          data-testId="timeAgo"
        >
          {{ timeAgoText }}
        </p>
        <p
          v-if="isEdited"
          data-testId="propsIsEdited"
        >
          （編集済み）
        </p>
      </div>

      <div
        data-testId="propsContent"
        class="whitespace-pre-wrap break-all"
      >
        {{ content }}
      </div>
    </div>

    <div class="flex items-start justify-center">
      <slot />
    </div>
  </div>
</template>
