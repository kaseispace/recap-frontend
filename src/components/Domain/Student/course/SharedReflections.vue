<script setup lang="ts">
const activeTabId = ref(0)
const isLoading = ref(true)
const reflectionKey = ref(0) // 新しいkeyを持たせるための変数

const { authUser } = useAuth()
const { courseUuid } = useCourseApi()
const { sharedCourseReflections, selectedCourseDateReflections, getSharedReflections } = useReflectionApi()
const { showSnackbar } = useSnackBar()

const setTab = (num: number) => {
  activeTabId.value = num
  if (sharedCourseReflections.value) {
    const foundReflections = sharedCourseReflections.value.find(courseDate => courseDate.id === num)
    if (foundReflections) {
      selectedCourseDateReflections.value = foundReflections.users_reflections
    }
  }

  reflectionKey.value++ // keyを更新して再生成をトリガー
}

onMounted(async () => {
  try {
    if (!authUser.value || !courseUuid.value) {
      showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
      return
    }

    if (sharedCourseReflections.value) {
      if (sharedCourseReflections.value.length === 0) {
        return
      }
      else {
        // 既に取得済みの場合は始めのデータをセットし直す
        setTab(sharedCourseReflections.value[0].id)
        return
      }
    }

    // 各受講生の振り返りを見るとき用
    const idToken = await authUser.value.getIdToken()
    sharedCourseReflections.value = await getSharedReflections(courseUuid.value, idToken)
    // マウント時は手動で授業日データをセット
    if (sharedCourseReflections.value.length > 0) {
      setTab(sharedCourseReflections.value[0].id)
    }
  }
  catch {
    showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
  }
  finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div
    v-if="isLoading"
    class="flex h-64 items-center justify-center"
  >
    <!-- ローディング中のコンポーネント -->
    <BaseLoading border-color="border-cyan-900" />
  </div>
  <div
    v-else
    class="sm:px-[52px]"
  >
    <div v-if="sharedCourseReflections && sharedCourseReflections.length > 0">
      <!-- Chips表示 -->
      <div class="my-4 flex flex-wrap">
        <div
          v-for="(courseDate, i) in sharedCourseReflections"
          :key="courseDate.id"
        >
          <BaseChip
            :data-testId="`chip-${i}`"
            :text="courseDate.course_number"
            :is-active="activeTabId === courseDate.id"
            active-color="bg-cyan-600/10 text-cyan-900"
            @click-emit="setTab(courseDate.id)"
          />
        </div>
      </div>
      <!-- Chips閉じ -->

      <!-- 付箋表示 -->
      <div
        v-if="selectedCourseDateReflections && selectedCourseDateReflections.length > 0"
        class="grid grid-cols-1 place-items-center gap-y-3 pt-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div
          v-for="(reflection, i) in selectedCourseDateReflections"
          :key="i"
          class="p-3"
        >
          <BaseCardPostIt :key="reflectionKey">
            <template
              v-for="(message, j) in reflection.reflections"
              :key="j"
            >
              <p
                v-if="message.message_type === 'user'"
                class="text-start"
              >
                {{ message.message }}
              </p>
            </template>
          </BaseCardPostIt>
        </div>
      </div>

      <!-- 授業日の振り返りがない -->
      <div
        v-else
        class="mt-10"
      >
        <div class="flex flex-col items-center">
          <BaseEmpty
            img-path="s-empty-shared-reflections_k3ozby.png"
            img-alt="みんなの振り返りはありません"
            explanation1="まだこの授業回には振り返りがありません"
            explanation2="振り返りが登録され次第、こちらでご覧いただけます"
          />
        </div>
      </div>
      <!-- 付箋閉じ -->
    </div>

    <!-- 授業日が1つもなく、表示できる振り返りが無い -->
    <div
      v-else
      class="mt-10"
    >
      <div class="flex flex-col items-center">
        <BaseEmpty
          img-path="s-empty-shared-reflections_k3ozby.png"
          img-alt="みんなの振り返りはありません"
          explanation1="みんなの振り返りはここに集まります"
          explanation2="他の人の振り返りを見て、学びを深めましょう！"
        />
      </div>
    </div>
  </div>
</template>
