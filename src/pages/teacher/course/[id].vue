<script setup lang="ts">
definePageMeta({
  middleware: ['teacher-permissions'],
  layout: 'teacher'
})

const activeTabId = ref(1)
const isLoading = ref(true)
const isImageLoaded = ref(false)

const route = useRoute()
const { authUser } = useAuth()
const { teacherCourses, currentCourse, courseUuid, courseCode, joinedUsers, getJoinedUsers, getCourseByUuid }
  = useCourseApi()
const { courseDates, getTeacherCourseDate } = useCourseDateApi()
const { announcements } = useAnnouncementApi()
const { prompts, activePrompt } = usePromptApi()
const { currentPrompts } = useChat()
const { teacherReflectionFlag, checkReflectionOnDate, courseUserReflections } = useReflectionApi()
const { dailyCourseReflections, userHistory } = useReflectionHistory()
const { snackbarMessage, snackbarStatus, showSnackbar } = useSnackBar()
const { nextCourseDate, findNextCourseDate } = useSetting()

const setTab = (num: number) => (activeTabId.value = num)
const imageLoad = (loaded: boolean) => (isImageLoaded.value = loaded)

const goToTeacherPage = async () => await navigateTo('/teacher')

watch(nextCourseDate, () => {
  console.log('更新されたし')
})

onMounted(async () => {
  courseUuid.value = route.params.id.toString()
  try {
    if (!authUser.value) {
      showSnackbar(ERROR_FIREBASE_AUTHENTICATION_FAILED, false)
      return
    }

    const idToken = await authUser.value.getIdToken()

    // 授業一覧を既に取得済みの場合
    if (teacherCourses.value) {
      currentCourse.value = teacherCourses.value.find(course => course.uuid === route.params.id) || null
    }
    else {
      currentCourse.value = await getCourseByUuid(courseUuid.value, idToken)
    }

    if (currentCourse.value) {
      useHead(teacherCourseMeta(currentCourse.value.name))
      courseCode.value = currentCourse.value.course_code
      joinedUsers.value = await getJoinedUsers(courseUuid.value, idToken)
      // 授業日一覧の取得
      courseDates.value = await getTeacherCourseDate(courseUuid.value, idToken)

      // 今日の日付確認
      const today = new Date().toLocaleDateString()
      if (courseDates.value) {
        // 今日の日付よりも後の授業日があるかどうか確認
        nextCourseDate.value = findNextCourseDate(courseDates.value)
        console.log('次の授業日', nextCourseDate.value)
        // 一番最後に登録した授業日が今日であれば、振り返りを取得しにいく
        if (nextCourseDate.value?.course_date === today) {
          console.log('今日の日付の授業日あり')
          teacherReflectionFlag.value = await checkReflectionOnDate(
            nextCourseDate.value.course_id,
            nextCourseDate.value.id,
            idToken
          )
          console.log('振り返りの有無', teacherReflectionFlag.value)
        }
        console.log('振り返りの有無', teacherReflectionFlag.value)
      }
    }
    else {
      useHead(notFoundMeta)
    }
  }
  catch {
    showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
  }
  finally {
    isLoading.value = false
  }
})

onUnmounted(() => {
  currentCourse.value = null
  courseCode.value = null
  joinedUsers.value = null
  courseDates.value = null
  announcements.value = null
  prompts.value = null
  activePrompt.value = null
  currentPrompts.value = []
  teacherReflectionFlag.value = null
  courseUserReflections.value = null
  dailyCourseReflections.value = null
  userHistory.value = undefined
  nextCourseDate.value = undefined
})
</script>

<template>
  <div>
    <BaseSnackbar
      :notification="snackbarMessage"
      :status="snackbarStatus"
    />

    <div
      v-if="!currentCourse && !isLoading"
      class="flex flex-col items-center justify-center pt-[80px] sm:pt-[140px]"
    >
      <BaseError404
        img-path="t-404_jngqh1.png"
        @image-load="imageLoad"
      />
      <BaseButton
        v-if="isImageLoaded"
        text="トップページへ戻る"
        button-type="circle"
        class="border px-3 py-2 hover:bg-gray-200"
        @click="goToTeacherPage"
      />
    </div>

    <div
      v-else-if="currentCourse && !isLoading"
      class="mx-auto my-16 w-full max-w-7xl space-y-16"
    >
      <div class="mx-6 flex flex-col">
        <div class="relative">
          <BaseTitle :text="currentCourse.name" />
        </div>

        <div>
          <!-- タブ開始 -->
          <div class="flex w-full justify-between border-b">
            <div class="no-scrollbar flex overflow-x-auto text-center text-sm font-medium">
              <ul class="flex">
                <BaseTab
                  v-for="(tab, i) in teacherTabs"
                  :key="i"
                  :data-testId="`tabIndex-${i}`"
                  :text="tab.text"
                  :is-active="activeTabId === tab.id"
                  active-color="border-blue-600  text-blue-600"
                  @click-emit="setTab(tab.id)"
                />
              </ul>
            </div>
            <div class="flex items-center justify-center">
              <DomainTeacherCourseSettingsMenuCourseDateAndReflectionAdded
                v-if="nextCourseDate && teacherReflectionFlag === true"
              />
              <DomainTeacherCourseSettingsMenuCourseDateAddedNoReflection
                v-else-if="nextCourseDate && (teacherReflectionFlag === false || teacherReflectionFlag === null)"
              />
              <DomainTeacherCourseSettingsMenuNoCourseDate v-else />
            </div>
          </div>
          <!-- タブ終了 -->

          <div>
            <div
              v-if="activeTabId === 1"
              class="flex flex-col px-5 pt-3"
            >
              <DomainTeacherCourseCreateAnnouncementCard />
              <DomainTeacherCourseShowAnnouncementCard />
            </div>
            <div
              v-if="activeTabId === 2"
              class="flex flex-col px-5 pt-3"
            >
              <DomainTeacherCourseCreatePromptCard />
              <DomainTeacherCourseShowPromptCard />
              <DomainTeacherCourseReflectionBot
                v-if="activePrompt"
                class="fixed bottom-10 right-8 z-10"
              />
            </div>
            <div
              v-if="activeTabId === 3"
              class="flex flex-col px-5 pt-3"
            >
              <DomainTeacherCourseReflectionHistory />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- マウントが完了するまで表示するやつ -->
    <div
      v-else
      class="mx-auto my-16 w-full max-w-7xl space-y-16"
    >
      <div class="mx-6 flex flex-col">
        <!-- <BaseLoading border-color="border-blue-900" /> -->

        <div
          v-if="isLoading"
          class="flex h-[298px] items-center justify-center"
        >
          <BaseLoading border-color="border-blue-900" />
        </div>
      </div>
    </div>
  </div>
</template>
