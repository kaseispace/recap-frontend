<script setup lang="ts">
const activeTabId = ref(0)
const isLoading = ref(true)
const reflectionKey = ref(0) // 新しいkeyを持たせるための変数
const selectedReflection = ref<UserReflections | null>(null)
const dialogRef = ref(null)

const { authUser } = useAuth()
const { courseUuid } = useCourseApi()
const { sharedCourseReflections, selectedCourseDateReflections, getSharedReflections } = useReflectionApi()
const { dialog, openDialog, closeDialog } = useDialog()
const { showSnackbar } = useSnackBar()
onClickOutside(dialogRef, closeDialog)

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

const handleShowReflectionDialog = (reflection: UserReflections) => {
  selectedReflection.value = reflection
  openDialog()
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
        class="grid grid-cols-1 place-items-center gap-x-5 gap-y-7 pt-4 xs2:grid-cols-2 xs2:place-items-stretch md2:grid-cols-3 lg2:grid-cols-4"
      >
        <div
          v-for="(reflection, i) in selectedCourseDateReflections"
          :key="i"
        >
          <BaseCardPostIt
            :key="reflectionKey"
            :data-testId="`postIt-${i}`"
            @click="handleShowReflectionDialog(reflection)"
          >
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

      <!-- みんなの振り返り用ダイアログ -->
      <BaseDialogOverlay v-if="dialog">
        <div class="flex w-full justify-center px-4">
          <BaseDialog
            ref="dialogRef"
            title="振り返り詳細"
            wide="large"
          >
            <template #icon>
              <BaseButton
                button-type="circleNormal"
                @click="closeDialog"
              >
                <Icon
                  name="ic:baseline-close"
                  size="30px"
                />
              </BaseButton>
            </template>

            <div
              v-for="(reflection, i) in selectedReflection?.reflections"
              :key="i"
              class="flex items-center justify-start"
            >
              <div
                v-if="reflection.message_type === 'bot'"
                class="flex items-start justify-start"
              >
                <BaseCardAvatar bg-color="bg-cyan-600/10">
                  <Icon
                    name="fluent-mdl2:chat-bot"
                    size="24px"
                    style="color: #164e63"
                  />
                </BaseCardAvatar>
                <div class="max-w-95/100 break-all px-3 py-2">
                  {{ reflection.message }}
                </div>
              </div>

              <div
                v-else
                class="flex items-start justify-start"
              >
                <BaseCardAvatar bg-color="bg-slate-600/10">
                  <Icon
                    name="mdi:user"
                    size="24px"
                    style="color: #475569"
                  />
                </BaseCardAvatar>
                <div class="max-w-95/100 break-all px-3 py-2">
                  {{ reflection.message }}
                </div>
              </div>
            </div>
          </BaseDialog>
        </div>
      </BaseDialogOverlay>
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
