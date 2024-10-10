<script setup lang="ts">
const isResetDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)

const { authUser } = useAuth()
const { userInfo } = useUserApi()
const { studentCourses, isStudentCourseLoading, getJoinedCourses } = useUserCourseApi()
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
  if (authUser.value && !studentCourses.value) {
    const idToken = await authUser.value.getIdToken()
    studentCourses.value = await getJoinedCourses(idToken)
    isStudentCourseLoading.value = false
  }
})

onUnmounted(() => {
  isStudentCourseLoading.value = true
})
</script>

<template>
  <div
    v-if="userInfo && authUser?.email"
    class="flex h-full"
  >
    <!-- サイドバー -->
    <BaseLayoutSideBar bg-color="hover:bg-cyan-600/10">
      <template
        v-for="item in studentSidebarMenuItems"
        :key="item"
      >
        <BaseLayoutNavIcon
          :icon-name="item.iconName"
          :path-name="item.path"
          active-bg="bg-cyan-600/40 hover:bg-cyan-600/40"
          inactive-bg="hover:bg-cyan-600/10"
        >
          <BaseTooltip
            class="left-[60px]"
            :message="item.title"
          />
        </BaseLayoutNavIcon>
      </template>

      <BaseLayoutIconMenuList
        :courses="studentCourses"
        title="受講一覧"
        :course-name="StudentCourseDetail"
        active-bg="bg-cyan-600/40"
        list-active-bg="bg-cyan-600/10 text-cyan-900"
        inactive-bg="hover:bg-cyan-600/10"
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
            :courses="studentCourses"
            title="受講一覧"
            :course-name="StudentCourseDetail"
            list-active-bg="bg-cyan-600/10 text-cyan-900"
            list-inactive-bg="hover:bg-slate-100 text-gray-500 hover:text-black"
            path-name="student"
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
          bg-color="bg-cyan-600 text-white hover:bg-cyan-600/75"
          @dialog-closed="closeResetDialog"
        />
        <DomainAccountDeletionDialog
          v-if="isDeleteDialogOpen"
          @dialog-closed="closeDeleteDialog"
        />
        <slot />
      </div>
    </main>
  </div>
</template>
