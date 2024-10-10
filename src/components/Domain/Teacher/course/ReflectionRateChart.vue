<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import { Line } from 'vue-chartjs'
import type { FontSpec, ChartData, ChartOptions } from 'chart.js'

Chart.register(...registerables)

const courseNumbers = ref<string[]>([])
const reflectionCounts = ref<number[]>([])
const reflectionRates = ref<number[]>([])

const { joinedUsers } = useCourseApi()
const { dailyCourseReflections } = useReflectionHistory()

const updateChartData = () => {
  courseNumbers.value = []
  reflectionCounts.value = []

  if (dailyCourseReflections.value && joinedUsers.value) {
    dailyCourseReflections.value.forEach((course) => {
      // 授業回
      courseNumbers.value.push(course.course_number)
      // 振り返りの件数を算出
      const count = course.users_reflections.filter(user => user.reflections.length > 0).length
      reflectionCounts.value.push(count)
    })

    // 少数点以下を切り捨て、記入率を算出
    reflectionRates.value = reflectionCounts.value.map(reflectionCount =>
    // @ts-expect-error: `joinedUsers.value.length` は一時的に未定義になる可能性があるが、後で処理されることが保証されているため無視
      Math.floor((reflectionCount / joinedUsers.value.length) * 100),
    )
  }
}

// グラフ内のフォントの共通設定
const commonFont: Partial<FontSpec> = {
  family: 'Noto Sans JP',
  size: 12,
  style: 'normal',
  weight: 'normal',
}

const data: ComputedRef<ChartData<'line'>> = computed(() => ({
  // updateChartDataでcourseNumbersが変更されると、computedが再計算する
  labels: courseNumbers.value,
  datasets: [
    {
      data: reflectionRates.value,
      fill: false, // 下部塗りつぶし
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f6', // 点の中の色
      tension: 0, // 曲線の度合い
      pointRadius: 7, // 点のサイズ
      pointStyle: 'rect', // 点の形
    },
  ],
}))

const options: ComputedRef<ChartOptions<'line'>> = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      align: 'start',
      display: true,
      position: 'top',
      text: '振り返り率',
      font: { ...commonFont, size: 14, weight: 600 },
      color: 'black',
      padding: {
        bottom: 20,
      },
    },
    legend: {
      display: false, // ラベルを非表示に設定
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || ''
          if (label) {
            label += ':'
          }
          if (context.parsed.y !== null) {
            label += '振り返り率：' + context.parsed.y + '%' // ここで単位を追加
          }
          return label
        },
      },
      titleFont: { ...commonFont, weight: 600 },
      bodyFont: { ...commonFont, weight: 600 },
      footerFont: commonFont,
      titleColor: '#334155',
      bodyColor: '#3b82f6',
      displayColors: false,
      padding: 7,
      backgroundColor: 'white', // 背景色
      borderColor: '#cbd5e1', // 枠線の色
      borderWidth: 1.5, // 枠線の太さ
    },
  },

  scales: {
    x: {
      ticks: {
        font: commonFont,
      },
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      suggestedMax: 100,
      border: {
        display: false, // 縦線消す
      },
      ticks: {
        font: commonFont,
        maxTicksLimit: 6, // 目盛りの最大表示数
        callback: function (value) {
          return value + '%' // ここで単位を追加
        },
      },
    },
  },
}))

// 授業日の追加・編集。削除を検知できるようにdailyCourseReflectionsを監視
watch(
  dailyCourseReflections,
  () => {
    updateChartData()
  },
  { deep: true },
)

updateChartData()
</script>

<!-- 高さのみ指定して、幅はautoで。 -->
<template>
  <div class="mb-5 h-60 bg-white p-4">
    <Line
      :data="data"
      :options="options"
    />
  </div>
</template>
