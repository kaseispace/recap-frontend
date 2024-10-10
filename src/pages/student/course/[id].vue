<script setup lang="ts">
definePageMeta({
  middleware: ['student-permissions'],
  layout: 'student',
})

const isLoading = ref(true)
const activeTabId = ref(1)
const showChat = ref(false)
const isImageLoaded = ref(false)

const route = useRoute()
const { authUser } = useAuth()
const { courseUuid } = useCourseApi()
const { studentCourses, currentStudentCourse, getJoinedCourse } = useUserCourseApi()
const { courseDates, todayCourseDate, getStudentCourseDate } = useCourseDateApi()
const { announcements } = useAnnouncementApi()
const { studentReflections } = useReflectionApi()
const { studentFeedbacks } = useFeedbackApi()
const { currentPrompts } = useChat()
const { snackbarMessage, snackbarStatus, showSnackbar } = useSnackBar()

const setTab = (num: number) => (activeTabId.value = num)
const imageLoad = (loaded: boolean) => (isImageLoaded.value = loaded)

const goToStudentPage = async () => await navigateTo('/student')

onMounted(async () => {
  courseUuid.value = route.params.id.toString()

  try {
    if (!authUser.value) {
      showSnackbar(ERROR_FIREBASE_AUTHENTICATION_FAILED, false)
      return
    }

    const idToken = await authUser.value.getIdToken()

    // 参加授業一覧を既に取得済みの場合
    if (studentCourses.value) {
      currentStudentCourse.value = studentCourses.value.find(course => course.uuid === route.params.id) || null
    }
    else {
      currentStudentCourse.value = await getJoinedCourse(courseUuid.value, idToken)
    }

    if (currentStudentCourse.value) {
      courseDates.value = await getStudentCourseDate(courseUuid.value, idToken)
      console.log('授業日を取得', courseDates.value)
      const today = new Date()
      console.log(today.toLocaleDateString())
      const foundCourseDate = courseDates.value.find(course => course.course_date === today.toLocaleDateString())
      console.log('foundCourseDateの値', foundCourseDate)
      if (foundCourseDate) {
        console.log('今日は授業日です')
        todayCourseDate.value = foundCourseDate
        showChat.value = true
      }
      else {
        console.log('今日は授業日ではありません')
      }
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
  currentStudentCourse.value = null
  courseDates.value = null
  todayCourseDate.value = null
  announcements.value = null
  studentReflections.value = null
  studentFeedbacks.value = null
  currentPrompts.value = []
})
</script>

<template>
  <div>
    <BaseSnackbar
      :notification="snackbarMessage"
      :status="snackbarStatus"
    />

    <div
      v-if="!currentStudentCourse && !isLoading"
      class="flex flex-col items-center justify-center pt-[80px] sm:pt-[140px]"
    >
      <BaseError404
        img-path="s-404_eadka6.png"
        @image-load="imageLoad"
      />
      <BaseButton
        v-if="isImageLoaded"
        text="トップページへ戻る"
        button-type="circle"
        class="border px-3 py-2 hover:bg-gray-200"
        @click="goToStudentPage"
      />
    </div>

    <div v-else-if="currentStudentCourse && !isLoading">
      <div class="mx-auto my-16 w-full max-w-7xl space-y-16">
        <div class="mx-6 flex flex-col">
          <div
            v-if="isLoading"
            class="flex h-8 items-center"
          >
            <BaseLoading
              icon-size="small"
              border-color="border-cyan-900"
            />
          </div>
          <BaseTitle
            v-else
            :text="currentStudentCourse.name"
          />

          <div>
            <!-- タブ開始 -->
            <div class="no-scrollbar flex w-full overflow-x-auto border-b text-center text-sm font-medium">
              <ul class="flex">
                <BaseTab
                  v-for="(tab, i) in studentTabs"
                  :key="i"
                  :data-testId="`tabIndex-${i}`"
                  :text="tab.text"
                  :is-active="activeTabId === tab.id"
                  active-color="border-cyan-600  text-cyan-600"
                  @click-emit="setTab(tab.id)"
                />
                <div class="p-3">
                  <!-- 三点リーダーのメニューをつけたい場合 -->
                  <!-- <Icon class="hover:rounded-full hover:border" name="mi:options-vertical" size="20px" @click="open" /> -->
                </div>
              </ul>
            </div>
            <!-- タブ終了 -->

            <div>
              <div
                v-if="activeTabId === 1"
                class="flex flex-col py-2"
              >
                <DomainStudentCourseShowAnnouncementCard />
              </div>
              <div
                v-if="activeTabId === 2"
                class="flex flex-col py-2"
              >
                <DomainStudentCourseReflectionHistory />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 振り返りbotをどのタブでも表示 -->
      <DomainStudentCourseReflectionBot v-if="showChat" />
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
          <BaseLoading border-color="border-cyan-900" />
        </div>
      </div>
    </div>
  </div>
</template>
