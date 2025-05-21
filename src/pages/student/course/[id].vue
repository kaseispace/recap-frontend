<script setup lang="ts">
definePageMeta({
  middleware: ['student-permissions'],
  layout: 'student'
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
const { studentReflections, sharedCourseReflections, selectedCourseDateReflections } = useReflectionApi()
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

    if (studentCourses.value) {
      currentStudentCourse.value = studentCourses.value.find(course => course.uuid === route.params.id) || null
    }
    else {
      currentStudentCourse.value = await getJoinedCourse(courseUuid.value, idToken)
    }

    if (currentStudentCourse.value) {
      useHead(STUDENT_COURSE_META(currentStudentCourse.value.name))
      courseDates.value = await getStudentCourseDate(courseUuid.value, idToken)
      const today = new Date()
      const foundCourseDate = courseDates.value.find(course => course.course_date === today.toLocaleDateString())
      if (foundCourseDate) {
        todayCourseDate.value = foundCourseDate
        showChat.value = true
      }
    }
    else {
      useHead(NOT_FOUND_META)
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
  sharedCourseReflections.value = null
  selectedCourseDateReflections.value = null
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
      v-if="isLoading"
      class="mx-auto my-16 w-full max-w-7xl"
    >
      <div class="mx-6 flex flex-col">
        <BaseSkeletonTitle />
        <BaseSkeletonNavigation />

        <div class="mx-5 mt-3 sm:mx-2">
          <template
            v-for="n in 3"
            :key="n"
          >
            <div class="sm:grid sm:grid-cols-8">
              <BaseSkeletonAnnouncementCard class="sm:col-span-6 sm:col-start-2" />
            </div>
          </template>
        </div>
      </div>
    </div>

    <div
      v-else-if="!isLoading && currentStudentCourse"
      class="mx-auto my-16 w-full max-w-7xl"
    >
      <div class="mx-6 flex flex-col">
        <BaseTitle :text="currentStudentCourse.name" />

        <div>
          <div class="no-scrollbar flex w-full overflow-x-auto border-b text-center text-sm font-medium">
            <ul class="flex">
              <BaseTab
                v-for="(tab, i) in STUDENT_TABS"
                :key="i"
                :data-testId="`tabIndex-${i}`"
                :text="tab.text"
                :is-active="activeTabId === tab.id"
                active-color="border-cyan-600  text-cyan-600"
                @click-emit="setTab(tab.id)"
              />
            </ul>
          </div>

          <div class="flex flex-col py-2">
            <div v-if="activeTabId === 1">
              <DomainStudentCourseShowAnnouncementCard />
            </div>

            <div v-else-if="activeTabId === 2">
              <DomainStudentCourseReflectionHistory />
            </div>

            <div v-else-if="activeTabId === 3">
              <DomainStudentCourseSharedReflections />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
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
  </div>
</template>
