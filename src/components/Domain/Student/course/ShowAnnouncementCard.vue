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

    // お知らせを既に取得済みの場合は何もしない
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
    class="flex h-64 items-center justify-center"
  >
    <!-- ローディング中のコンポーネント -->
    <BaseLoading border-color="border-cyan-900" />
  </div>

  <div v-else>
    <!-- 表示するデータがある場合 -->
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

    <!-- 表示するデータが無い場合 -->
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
