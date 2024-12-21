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
      courseNumbers.value.push(course.course_number)
      // 振り返りの件数を算出
      const count = course.users_reflections.filter(user => user.reflections.length > 0).length
      reflectionCounts.value.push(count)
    })

    // 少数点以下を切り捨て、記入率を算出
    reflectionRates.value = reflectionCounts.value.map(reflectionCount =>
    // @ts-expect-error: `joinedUsers.value.length` は一時的に未定義になる可能性があるが、後で処理されることが保証されているため無視
      Math.floor((reflectionCount / joinedUsers.value.length) * 100)
    )
  }
}

// グラフ内共通フォント
const commonFont: Partial<FontSpec> = {
  family: 'Noto Sans JP',
  size: 12,
  style: 'normal',
  weight: 'normal'
}

const data: ComputedRef<ChartData<'line'>> = computed(() => ({
  labels: courseNumbers.value,
  datasets: [
    {
      data: reflectionRates.value,
      fill: false, // 下部塗りつぶし
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f6', // 点の中の色
      tension: 0, // 曲線の度合い
      pointRadius: 7, // 点のサイズ
      pointStyle: 'rect' // 点の形
    }
  ]
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
        bottom: 20
      }
    },
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || ''
          if (label) {
            label += ':'
          }
          if (context.parsed.y !== null) {
            label += '振り返り率：' + context.parsed.y + '%'
          }
          return label
        }
      },
      titleFont: { ...commonFont, weight: 600 },
      bodyFont: { ...commonFont, weight: 600 },
      footerFont: commonFont,
      titleColor: '#334155',
      bodyColor: '#3b82f6',
      displayColors: false,
      padding: 7,
      backgroundColor: 'white',
      borderColor: '#cbd5e1',
      borderWidth: 1.5
    }
  },

  scales: {
    x: {
      ticks: {
        font: commonFont
      },
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      suggestedMax: 100,
      border: {
        display: false
      },
      ticks: {
        font: commonFont,
        maxTicksLimit: 6,
        callback: function (value) {
          return value + '%'
        }
      }
    }
  }
}))

watch(
  dailyCourseReflections,
  () => {
    updateChartData()
  },
  { deep: true }
)

updateChartData()
</script>

<template>
  <div class="mb-5 h-60 bg-white p-4">
    <Line
      :data="data"
      :options="options"
    />
  </div>
</template>
