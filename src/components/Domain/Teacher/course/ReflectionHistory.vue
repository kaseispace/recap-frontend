<script setup lang="ts">
const userName = ref('')
const activeTabId = ref(0)
const isLoading = ref(true)
const dialogRef = ref(null)

const { authUser } = useAuth()
const { courseUuid, joinedUsers } = useCourseApi()
const { courseUserReflections, getAllStudentReflectionStatus, getAllStudentReflections } = useReflectionApi()
const { dailyCourseReflections, userHistory } = useReflectionHistory()
const { dialog: isDialog, openDialog, closeDialog } = useDialog()
const { showSnackbar } = useSnackBar()
onClickOutside(dialogRef, closeDialog)

// 親コンポーネントでemitを受け取った際の動作
const onSelectUser = (selectUser: { id: number, name: string }) => {
  if (courseUserReflections.value) {
    userName.value = selectUser.name
    userHistory.value = courseUserReflections.value.find(user => user.user_id === selectUser.id)
    openDialog()
  }
}
const setTab = (num: number) => (activeTabId.value = num)

// 各学生の振り返り履歴を閲覧した際に、activeTabIdが最後に開いたidを保持したままで、別の学生を開く際に予期しない挙動になるのを防ぐ対策
watch(
  () => isDialog.value,
  () => {
    if (isDialog.value === false) {
      activeTabId.value = 0
    }
  }
)

onMounted(async () => {
  try {
    if (!authUser.value || !courseUuid.value) {
      showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
      return
    }

    if (courseUserReflections.value && dailyCourseReflections.value) return

    // 各受講生の振り返りを見るとき用
    const idToken = await authUser.value.getIdToken()
    courseUserReflections.value = await getAllStudentReflections(courseUuid.value, idToken)
    const getAllStudentReflectionData = await getAllStudentReflectionStatus(courseUuid.value, idToken)
    dailyCourseReflections.value = getAllStudentReflectionData.map(courseDate => courseDate.course_date)
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
    <BaseLoading border-color="border-blue-900" />
  </div>
  <div
    v-else
    class="mt-3 grid grid-cols-1"
  >
    <BaseCardHistory
      title="活動履歴"
      bg-color="bg-gray-100"
    >
      <DomainTeacherCourseReflectionRateChart
        v-if="dailyCourseReflections && dailyCourseReflections.length > 0 && joinedUsers && joinedUsers.length > 0"
      />
      <template
        v-if="dailyCourseReflections && dailyCourseReflections.length > 0 && joinedUsers && joinedUsers.length > 0"
      >
        <BaseTable
          :rows="dailyCourseReflections"
          :columns="joinedUsers"
          row-title="氏名"
          @user-selected="onSelectUser"
        />
      </template>

      <div
        v-else
        class="bg-white p-9 text-center text-sm sm:text-base"
      >
        <p>現在、振り返りのデータはありません。</p>
        <p>学生が授業に参加し始めると、データが表示されます。</p>
      </div>
    </BaseCardHistory>
  </div>

  <!-- 振り返り詳細 -->
  <BaseDialogOverlay
    v-if="isDialog"
    dialog-type="right"
  >
    <div class="flex w-full justify-end pl-8">
      <div
        ref="dialogRef"
        class="slide-in-right flex w-full max-w-[400px] flex-col bg-white p-3"
      >
        <!-- ユーザー名 -->
        <div class="flex items-center justify-between border-b pb-2">
          <!-- <BaseCardAvatar bg-color="bg-slate-600/20">
          <Icon name="mdi:user" size="24px" color="#475569" />
        </BaseCardAvatar> -->
          <div class="text-base font-medium xs:text-lg">
            {{ userName }}の振り返り履歴
          </div>
          <BaseButton
            class="p-2"
            button-type="circleNormal"
            @click="closeDialog"
          >
            <Icon
              name="ic:baseline-close"
              size="16px"
              style="color: #1f2937"
            />
          </BaseButton>
        </div>

        <!-- 表示するデータがある場合 -->
        <div
          v-if="userHistory && userHistory.user_reflections.length > 0"
          class="flex flex-col justify-between overflow-hidden"
        >
          <!-- 振り返り授業回 -->
          <div class="mb-3 mt-5 flex flex-wrap">
            <div
              v-for="(courseDate, i) in userHistory?.user_reflections"
              :key="i"
            >
              <BaseChip
                :text="courseDate.course_number"
                :is-active="activeTabId === i"
                active-color="bg-blue-600/10 text-blue-900"
                @click-emit="setTab(i)"
              />
            </div>
          </div>

          <div class="flex flex-col overflow-hidden">
            <div
              v-for="(courseDate, i) in userHistory?.user_reflections"
              :key="i"
              class="flex flex-col overflow-hidden"
            >
              <div
                v-if="activeTabId === i"
                class="flex flex-col overflow-hidden"
              >
                <!-- 各授業回の振り返りタイトル -->
                <div class="flex flex-col justify-start pb-3">
                  <!-- <h1 class="mb-1 text-xl">{{ `${courseDate.course_number}の振り返り` }}</h1> -->
                  <p class="text-sm text-gray-500">
                    {{ `授業日 ${courseDate.course_date}` }}
                  </p>
                </div>

                <!-- 振り返り内容 -->
                <div class="flex flex-col overflow-hidden">
                  <div class="history-scrollbar overflow-y-auto">
                    <div class="flex flex-col space-y-3">
                      <div
                        v-for="(reflection, j) in courseDate.reflections"
                        :key="j"
                        class="flex items-center justify-start"
                      >
                        <div
                          v-if="reflection.message_type === 'bot'"
                          class="flex items-start justify-start"
                        >
                          <BaseCardAvatar bg-color="bg-blue-600/20">
                            <Icon
                              name="fluent-mdl2:chat-bot"
                              size="18px"
                              style="color: #1e3a8a"
                            />
                          </BaseCardAvatar>

                          <div class="ml-2 pt-[8px] text-sm">
                            {{ reflection.message }}
                          </div>
                        </div>

                        <div
                          v-else
                          class="flex items-start justify-start"
                        >
                          <BaseCardAvatar bg-color="bg-slate-600/20">
                            <Icon
                              name="mdi:user"
                              size="18px"
                              style="color: #475569"
                            />
                          </BaseCardAvatar>

                          <div class="ml-2 pt-[8px] text-sm">
                            {{ reflection.message }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 表示するデータが無い場合 -->
        <div
          v-else
          class="flex h-full flex-col items-center justify-center p-2"
        >
          <DomainTeacherCourseEmptyReflection />
        </div>
      </div>
    </div>
  </BaseDialogOverlay>
</template>
