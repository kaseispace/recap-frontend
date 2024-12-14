<script setup lang="ts">
const isResetDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)

const { authUser } = useAuth()
const { userInfo } = useUserApi()
const { teacherCourses, isTeacherCourseLoading, getCourse } = useCourseApi()
const closeResetDialog = () => (isResetDialogOpen.value = false)
const closeDeleteDialog = () => (isDeleteDialogOpen.value = false)

const handleEditOrDeleteAction = (actionId: number) => {
  switch (actionId) {
    case 1:
      isResetDialogOpen.value = true
      break
    case 2:
      isDeleteDialogOpen.value = true
      break
  }
}

onMounted(async () => {
  if (authUser.value && !teacherCourses.value) {
    const idToken = await authUser.value.getIdToken()
    teacherCourses.value = await getCourse(idToken)
    isTeacherCourseLoading.value = false
  }
  else {
    isTeacherCourseLoading.value = false
  }
})

onUnmounted(() => {
  isTeacherCourseLoading.value = true
})
</script>

<template>
  <div
    v-if="userInfo && authUser?.email"
    class="flex h-full"
  >
    <!-- サイドバー -->
    <BaseLayoutSideBar bg-color="hover:bg-blue-600/10">
      <template
        v-for="item in TEACHER_SIDEBAR_MENU_ITEMS"
        :key="item"
      >
        <BaseLayoutNavIcon
          :icon-name="item.iconName"
          :path-name="item.path"
          active-bg="bg-blue-600/40 hover:bg-blue-600/40"
          inactive-bg="hover:bg-blue-600/10"
        >
          <BaseTooltip
            class="left-[60px]"
            :message="item.title"
          />
        </BaseLayoutNavIcon>
      </template>

      <BaseLayoutIconMenuList
        :courses="teacherCourses"
        title="担当授業一覧"
        :course-name="TEACHER_COURSE_DETAIL"
        active-bg="bg-blue-600/40"
        list-active-bg="bg-blue-600/10 text-blue-900"
        inactive-bg="hover:bg-blue-600/10"
        list-inactive-bg="hover:bg-slate-100 text-gray-500 hover:text-black"
      >
        <Icon
          name="streamline:class-lesson"
          size="24px"
        />
        <BaseTooltip
          class="left-[52px]"
          message="クラス"
        />
      </BaseLayoutIconMenuList>
    </BaseLayoutSideBar>
    <!-- サイドバー -->
    <main class="flex w-full flex-1 flex-col">
      <!-- アプリケーションバー -->
      <BaseLayoutAppBar :school-name="userInfo.school.name">
        <template #icon>
          <BaseLayoutMobileSideBar
            :courses="teacherCourses"
            title="担当授業一覧"
            :course-name="TEACHER_COURSE_DETAIL"
            list-active-bg="bg-blue-600/10 text-blue-900"
            list-inactive-bg="hover:bg-slate-100 text-gray-500 hover:text-black"
            path-name="teacher"
          />
        </template>

        <BaseMoreAccount
          :name="userInfo.user.name"
          :email="authUser.email"
          :role="userInfo.user.user_type"
          @select-menu="handleEditOrDeleteAction"
        />
      </BaseLayoutAppBar>
      <div class="flex-1">
        <DomainPasswordResetDialog
          v-if="isResetDialogOpen"
          bg-color="bg-blue-600 text-white hover:bg-blue-600/75"
          @dialog-closed="closeResetDialog"
        />
        <DomainAccountDeletionDialog
          v-if="isDeleteDialogOpen"
          @dialog-closed="closeDeleteDialog"
        />
        <slot />
      </div>

      <BaseLayoutFooter />
    </main>
  </div>
</template>
