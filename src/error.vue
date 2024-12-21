<script setup lang="ts">
useHead(NOT_FOUND_META)

interface Props {
  error: {
    statusCode?: number
  }
}
const props = defineProps<Props>()

const isResetDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const isImageLoaded = ref(false)

const { authUser } = useAuth()
const { userInfo } = useUserApi()
const { teacherCourses, getCourse, isTeacherCourseLoading } = useCourseApi()
const { studentCourses, getJoinedCourses, isStudentCourseLoading } = useUserCourseApi()
const { snackbarMessage, snackbarStatus, showSnackbar } = useSnackBar()

const closeResetDialog = () => (isResetDialogOpen.value = false)
const closeDeleteDialog = () => (isDeleteDialogOpen.value = false)
const imageLoad = (loaded: boolean) => (isImageLoaded.value = loaded)

const goToRootPage = async () => await navigateTo('/')

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
  try {
    if (authUser.value) {
      if (userInfo.value?.user.user_type === 1 && !teacherCourses.value) {
        const idToken = await authUser.value.getIdToken()
        teacherCourses.value = await getCourse(idToken)
        isTeacherCourseLoading.value = false
      }
      else if (userInfo.value?.user.user_type === 0 && !studentCourses.value) {
        const idToken = await authUser.value.getIdToken()
        studentCourses.value = await getJoinedCourses(idToken)
        isStudentCourseLoading.value = false
      }
    }
  }
  catch {
    showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
  }
})
</script>

<template>
  <div class="flex h-full">
    <BaseSnackbar
      :notification="snackbarMessage"
      :status="snackbarStatus"
    />
    <!-- ログイン済みの共通サイドバー -->
    <BaseLayoutSideBar
      v-if="userInfo"
      :bg-color="teacherCourses ? 'hover:bg-blue-600/10' : 'hover:bg-cyan-600/10'"
    >
      <BaseLayoutNavIcon
        icon-name="fluent-mdl2:home"
        :path-name="teacherCourses ? 'teacher' : 'student'"
        :active-bg="teacherCourses ? 'bg-blue-600/40 hover:bg-blue-600/40' : 'bg-cyan-600/40 hover:bg-cyan-600/40'"
        :inactive-bg="teacherCourses ? 'hover:bg-blue-600/10' : 'hover:bg-cyan-600/10'"
      >
        <BaseTooltip
          class="left-[60px]"
          message="ホーム"
        />
      </BaseLayoutNavIcon>

      <BaseLayoutIconMenuList
        :courses="teacherCourses ? teacherCourses : studentCourses"
        :title="teacherCourses ? '担当授業一覧' : '受講一覧'"
        :course-name="teacherCourses ? TEACHER_COURSE_DETAIL : STUDENT_COURSE_DETAIL"
        :active-bg="teacherCourses ? 'bg-blue-600/40' : 'bg-cyan-600/40'"
        :list-active-bg="teacherCourses ? 'bg-blue-600/10 text-blue-900' : 'bg-cyan-600/10 text-cyan-900'"
        :inactive-bg="teacherCourses ? 'hover:bg-blue-600/10' : 'hover:bg-cyan-600/10'"
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

    <main class="flex min-h-screen w-full flex-1 flex-col">
      <BaseLayoutAppBar :school-name="userInfo ? userInfo.school.name : ''">
        <template
          v-if="userInfo"
          #icon
        >
          <BaseLayoutMobileSideBar
            :courses="teacherCourses ? teacherCourses : studentCourses"
            :title="teacherCourses ? '担当授業一覧' : '受講一覧'"
            :course-name="teacherCourses ? TEACHER_COURSE_DETAIL : STUDENT_COURSE_DETAIL"
            :list-active-bg="teacherCourses ? 'bg-blue-600/10 text-blue-900' : 'bg-cyan-600/10 text-cyan-900'"
            list-inactive-bg="hover:bg-slate-100 text-gray-500 hover:text-black"
            :path-name="teacherCourses ? 'teacher' : 'student'"
            :school-name="userInfo.school.name"
          />
        </template>

        <template
          v-else
          #icon
        >
          <NuxtLink
            class="flex items-center"
            to="/"
          >
            <NuxtImg
              provider="cloudinary"
              src="logo_bc5hbs.png"
              width="32px"
              class="mr-1"
            />
            <span class="font-bold">
              ReCap
            </span>
          </NuxtLink>
        </template>

        <BaseMoreAccount
          v-if="authUser?.email && userInfo"
          :name="userInfo.user.name"
          :email="authUser.email"
          :role="userInfo.user.user_type"
          @select-menu="handleEditOrDeleteAction"
        />

        <div
          v-else
          class="flex items-center justify-center"
        >
          <BaseLink
            text="ログイン"
            path="index"
            class="font-medium hover:text-sky-600"
          />
          <span class="mx-1.5">/</span>
          <BaseLink
            text="新規登録"
            path="signup"
            class="font-medium hover:text-sky-600"
          />
        </div>
      </BaseLayoutAppBar>
      <div class="flex-1">
        <DomainPasswordResetDialog
          v-if="isResetDialogOpen"
          :bg-color="
            teacherCourses
              ? 'bg-blue-600 text-white hover:bg-blue-600/75'
              : 'bg-cyan-600 text-white hover:bg-cyan-600/75'
          "
          @dialog-closed="closeResetDialog"
        />
        <DomainAccountDeletionDialog
          v-if="isDeleteDialogOpen"
          @dialog-closed="closeDeleteDialog"
        />

        <div class="mt-[80px] flex flex-col items-center px-4 sm:mt-[140px]">
          <template v-if="props.error.statusCode === 404">
            <BaseError404
              v-if="userInfo?.user.user_type === 1"
              img-path="t-404_jngqh1.png"
              @image-load="imageLoad"
            />
            <BaseError404
              v-else-if="userInfo?.user.user_type === 0"
              img-path="s-404_eadka6.png"
              @image-load="imageLoad"
            />
            <BaseError404
              v-else
              img-path="404_n72mzp.png"
              @image-load="imageLoad"
            />
          </template>

          <BaseButton
            v-if="isImageLoaded"
            text="トップページへ戻る"
            button-type="circle"
            class="border px-3 py-2 hover:bg-gray-200"
            @click="goToRootPage"
          />
        </div>
      </div>

      <BaseLayoutFooter />
    </main>
  </div>
</template>
