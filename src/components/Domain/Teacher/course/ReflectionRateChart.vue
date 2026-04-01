<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import { Line } from 'vue-chartjs'
import type { FontSpec, ChartData, ChartOptions } from 'chart.js'

Chart.register(...registerables)

const { joinedUsers } = useCourseApi()
const { dailyCourseReflections } = useReflectionHistory()

// 授業回のラベルを算出
const courseNumbers = computed<string[]>(() => {
  if (!dailyCourseReflections.value) return []
  return dailyCourseReflections.value.map(course => course.course_number)
})

// 少数点以下を切り捨て、振り返り率を算出
const reflectionRates = computed<number[]>(() => {
  if (!dailyCourseReflections.value || !joinedUsers.value) return []
  const total = joinedUsers.value.length
  return dailyCourseReflections.value.map((course) => {
    const count = course.users_reflections.filter(user => user.reflections.length > 0).length
    return Math.floor((count / total) * 100)
  })
})

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
</script>

<template>
  <div class="mb-5 h-60 bg-white p-4">
    <Line
      :data="data"
      :options="options"
    />
  </div>
</template>
