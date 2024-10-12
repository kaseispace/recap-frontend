<script setup lang="ts">
interface Props {
  rows: DailyCourseReflection[] // header用授業回タイトル
  columns: SimplifiedUser[] // 受講生一覧
  rowTitle: string
}

interface Emits {
  (event: 'userSelected', selectedUser: { id: number, name: string }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const currentColumns = ref<SimplifiedUser[]>([]) // 現在の学生一覧
const reflectionStatusCache = ref<Record<string, string>>({}) // キャッシュ確認用
const page = ref(1) // 開始ページ
const pageSize = ref(10) // 最大表示件数

const { checkReflections, convertDateFormat } = useReflectionHistory()

// 当初の予定ではUserIdだけを渡す予定だったが、nameもほしくなった
// const selectUser = (column: number, name :string) => emit('userSelected', column, name) // userIdを渡す用
const selectUser = (column: number, name: string) => {
  const user = { id: column, name }
  emit('userSelected', user)
}

// Columnsを更新する
const setCurrentColumns = ({ currentPage, currentPageSize }: { currentPage: number, currentPageSize: number }) => {
  // 現在のページ数と、最大表示件数を引数から取得
  const start = (currentPage - 1) * currentPageSize
  const end = start + currentPageSize
  currentColumns.value = props.columns.slice(start, end) // sliceメソッドで切り取られるのは、endの1つ前まで（endは含まれない）
}

setCurrentColumns({
  currentPage: page.value,
  currentPageSize: pageSize.value
})

const { currentPage, isFirstPage, isLastPage, prev, next } = useOffsetPagination({
  total: props.columns.length,
  page: 1,
  pageSize,
  onPageChange: setCurrentColumns,
  onPageSizeChange: setCurrentColumns
})

// 全データ中のどこのデータを表示しているか
const currentDataRange = computed(() => {
  console.log('currentDataRange起動')
  const start = (currentPage.value - 1) * pageSize.value
  const end = Math.min(start + pageSize.value, props.columns.length)
  return { start, end }
})

const getReflectionStatus = (row: DailyCourseReflection, column: SimplifiedUser) => {
  const key = `${row.id}-${column.id}`
  // console.log(key)
  if (!reflectionStatusCache.value[key]) {
    // console.log('キャッシュされてません')
    reflectionStatusCache.value[key] = checkReflections(row, column)
    // console.log(reflectionStatusCache.value)
  }
  return reflectionStatusCache.value[key]
}

// reflectionStatusCacheはリアクティブで定義しているため、一度キャッシュリセットする（これで、更新された値がpropsで渡されてもアイコンの更新がされる）
// 変更があったところだけのアイコンを更新したいので、配列の最後のキャッシュを削除する
watch(
  () => props.rows,
  () => {
    const lastRow = props.rows[props.rows.length - 1]
    Object.keys(reflectionStatusCache.value).forEach((cacheKey) => {
      if (cacheKey.startsWith(`${lastRow.id}-`)) {
        // eslint-disable-next-line
        delete reflectionStatusCache.value[cacheKey]
      }
    })
    // 全てリセットしたい場合
    // reflectionStatusCache.value = {}
  },
  { deep: true }
)
</script>

<template>
  <div>
    <div class="flex flex-col items-end space-x-4 bg-white px-4 pt-4 text-sm sm:flex-row sm:justify-end">
      <div
        v-for="(status, i) in TABLE_STATUS"
        :key="i"
        class="flex items-center"
      >
        <Icon
          :name="status.name"
          size="14px"
          :style="{ color: status.color }"
        />
        <p>{{ status.text }}</p>
      </div>
    </div>
    <div class="table-scrollbar overflow-x-auto bg-white">
      <table class="w-full text-sm text-black">
        <thead>
          <tr class="border-b-2">
            <th class="sticky left-0 top-0 z-10 bg-white p-3 px-4 text-left">
              {{ rowTitle }}
            </th>
            <th
              v-for="row in rows"
              :key="row.id"
              class="w-24 whitespace-pre p-2 px-3 font-normal"
            >
              <div class="p-1 text-sm font-semibold">
                <p>{{ row.course_number }}</p>
                <p>{{ convertDateFormat(row.course_date) }}</p>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="column in currentColumns"
            :key="column.id"
            class="border-b"
          >
            <td
              class="sticky left-0 top-0 flex items-center justify-start whitespace-pre bg-white p-3 px-4 text-left text-slate-700"
            >
              {{ column.name }}
              <div class="group relative cursor-pointer">
                <BaseTooltip
                  class="-top-0.5 left-6"
                  message="詳細を表示"
                />
                <Icon
                  name="pajamas:details-block"
                  size="14px"
                  style="color: #1e3a8a"
                  @click="selectUser(column.id, column.name)"
                />
              </div>
            </td>
            <td
              v-for="row in rows"
              :key="row.id"
              class="w-24 text-center"
            >
              <!-- 記入済 -->
              <Icon
                v-if="getReflectionStatus(row, column) === 'filledIn'"
                name="gg:check-o"
                size="20px"
                style="color: green"
              />
              <!-- 未記入 -->
              <Icon
                v-else-if="getReflectionStatus(row, column) === 'notFilledIn'"
                name="gg:close-o"
                size="20px"
                style="color: red"
              />
              <!-- 授業実施前 -->
              <Icon
                v-else-if="getReflectionStatus(row, column) === 'courseNotHeld'"
                name="gg:math-minus"
                size="20px"
                style="color: gray"
              />
              <!-- 振り返りの実施なし -->
              <Icon
                v-else-if="getReflectionStatus(row, column) === 'reflectionNotHeld'"
                name="gg:close-r"
                size="20px"
                style="color: orange"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-col items-end px-4 pt-4 text-sm sm:flex-row sm:items-center sm:justify-end">
      <p class="mx-2">
        {{ columns.length }}件中 {{ currentDataRange.start + 1 }}-{{ currentDataRange.end }}を表示中
      </p>

      <div class="flex items-center justify-center">
        <!-- 戻るボタン -->
        <BaseButton
          button-type="pagination"
          :is-enabled="isFirstPage"
          @click="prev"
        >
          <Icon
            v-if="isFirstPage"
            name="mdi:chevron-left"
            size="28px"
            style="color: #94a3b8"
          />
          <Icon
            v-else
            name="mdi:chevron-left"
            size="28px"
            style="color: #1e3a8a"
          />
        </BaseButton>

        <p class="mx-2">
          {{ currentPage }}ページ
        </p>

        <!-- 次ボタン -->
        <BaseButton
          button-type="pagination"
          :is-enabled="isLastPage"
          @click="next"
        >
          <Icon
            v-if="isLastPage"
            name="mdi:chevron-right"
            size="28px"
            style="color: #94a3b8"
          />
          <Icon
            v-else
            name="mdi:chevron-right"
            size="28px"
            style="color: #1e3a8a"
          />
        </BaseButton>
      </div>
    </div>
  </div>
</template>
