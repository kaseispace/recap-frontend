<script setup lang="ts">
interface Props {
  content: string
  dateTime: string
}
const props = defineProps<Props>()

const timeAgo = useTimeAgo(new Date(props.dateTime))
const timeAgoText = ref('')
const timeUnits = {
  just: '今',
  minute: '分前',
  hour: '時間前',
  yesterday: '昨日'
}

// propsで渡された値を任意の形式として表示できるようにする
const timeCheck = () => {
  for (const [key, value] of Object.entries(timeUnits)) {
    if (timeAgo.value.includes(key)) {
      const numberPart = timeAgo.value.split(' ')[0]
      timeAgoText.value = key === 'just' ? value : numberPart === 'yesterday' ? value : numberPart + value
      return
    }
  }

  const dateValue = new Date(props.dateTime)
  timeAgoText.value = dateValue.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

watch(timeAgo, timeCheck)
onMounted(timeCheck)
</script>

<template>
  <div class="relative mb-4 flex justify-between rounded-md border p-3">
    <div class="flex flex-col text-sm">
      <p
        data-testId="timeAgo"
        class="mb-2 text-gray-500"
      >
        {{ timeAgoText }}
      </p>

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
