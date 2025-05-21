<script setup lang="ts">
const isLoading = ref(true)

const { authUser } = useAuth()
const { courseUuid } = useCourseApi()
const { announcements, getStudentAnnouncements } = useAnnouncementApi()
const { showSnackbar } = useSnackBar()

onMounted(async () => {
  await nextTick()
  try {
    if (!authUser.value || !courseUuid.value) {
      showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
      return
    }

    if (announcements.value) return

    const idToken = await authUser.value.getIdToken()
    announcements.value = await getStudentAnnouncements(courseUuid.value, idToken)
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
    class="mt-4 px-5 sm:px-2"
  >
    <template
      v-for="n in 3"
      :key="n"
    >
      <div class="sm:grid sm:grid-cols-8">
        <BaseSkeletonAnnouncementCard class="sm:col-span-6 sm:col-start-2" />
      </div>
    </template>
  </div>

  <div v-else>
    <div
      v-if="announcements && announcements.length > 0"
      class="mt-4 px-5"
    >
      <template
        v-for="(announcement, i) in announcements"
        :key="announcement"
      >
        <div class="sm:grid sm:grid-cols-8">
          <BaseCardAnnouncement
            :data-testId="`announcement-${i}`"
            class="sm:col-span-6 sm:col-start-2"
            :content="announcement.content"
            :date-time="announcement.created_at"
            :is-edited="announcement.created_at !== announcement.updated_at"
          />
        </div>
      </template>
    </div>

    <div
      v-else
      class="mt-10"
    >
      <div class="flex flex-col items-center">
        <BaseEmpty
          img-path="s-no-announcement_xztyxe.png"
          img-alt="お知らせはありません"
          explanation1="現在、教員からのお知らせはありません"
        />
      </div>
    </div>
  </div>
</template>
