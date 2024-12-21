<script setup lang="ts">
import type { FetchError } from 'ofetch'

const courseUuid = ref('')
const dialogRef = ref(null)
const isClick = ref(false)

const { authUser } = useAuth()
const { studentCourses, isStudentCourseLoading, leaveCourse } = useUserCourseApi()
const { dialog, openDialog, closeDialog } = useDialog()
const { showSnackbar } = useSnackBar()
onClickOutside(dialogRef, closeDialog)

const handleLeaveAction = (_actionId: number, course: StudentCourse) => {
  courseUuid.value = course.uuid
  openDialog()
}

const handleLeaveCourse = async () => {
  if (authUser.value && courseUuid.value) {
    isClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      await leaveCourse(courseUuid.value, idToken)
      if (studentCourses.value) {
        studentCourses.value = studentCourses.value.filter(course => course.uuid !== courseUuid.value)
        showSnackbar(SUCCESS_COURSE_EXIT, true)
        closeDialog()
      }
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 403:
          showSnackbar(ERROR_COURSE_NOT_A_PARTICIPANT, false)
          break
        case 404:
          showSnackbar(ERROR_COURSE_EXIT_NOT_FOUND, false)
          break
        default:
          showSnackbar(ERROR_COURSE_EXIT_FAILURE, false)
      }
    }
    finally {
      isClick.value = false
    }
  }
  else {
    showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
  }
}
</script>

<template>
  <div
    v-if="isStudentCourseLoading"
    class="flex h-64 items-center justify-center"
  >
    <BaseLoading border-color="border-cyan-900" />
  </div>
  <div v-else>
    <div
      v-if="studentCourses && studentCourses.length > 0"
      class="space-y-6"
    >
      <div class="grid grid-cols-1 gap-x-4 gap-y-7 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
        <template
          v-for="(course, i) in studentCourses"
          :key="course"
        >
          <BaseCard
            :data-testId="`card-${i}`"
            :subject-name="course.name"
            :teacher-name="course.teacher_name"
            :path-name="STUDENT_COURSE_DETAIL"
            :param-id="course.uuid"
            bg-color="bg-cyan-900"
          >
            <template #moreIcon>
              <BaseMore
                :menu-array="STUDENT_COURSE_SETTING"
                hover-bgcolor="hover:bg-cyan-400/50"
                @click.prevent
                @select-menu="(emittedItem) => handleLeaveAction(emittedItem, course)"
              >
                <Icon
                  name="mi:options-vertical"
                  size="20px"
                  style="color: white"
                />
              </BaseMore>
            </template>
            <template #chip>
              <BaseCardChips
                :text="course.day_of_week"
                :icon-type="CALENDAR_ICON"
              />
              <BaseCardChips
                :text="course.course_time"
                :icon-type="TIMETABLE_ICON"
              />
            </template>
          </BaseCard>
        </template>

        <BaseDialogOverlay
          v-if="dialog"
          data-testId="leaveDialog"
        >
          <div class="flex w-full justify-center px-4">
            <BaseDialog
              ref="dialogRef"
              title="授業から退出"
              wide="small"
            >
              <p class="text-sm">
                {{ MESSAGE_COURSE_EXIT }}
              </p>

              <div class="w-full rounded-md bg-gray-200 p-3 text-sm">
                <p class="mb-1">
                  受講中一覧から表示が消えます
                </p>
                <p>再度授業に参加すると、以前のデータが復元できます</p>
              </div>

              <template #footer>
                <BaseButton
                  text="キャンセル"
                  button-type="none"
                  class="border border-slate-400 hover:bg-slate-100"
                  @click="closeDialog"
                />

                <BaseButton
                  data-testId="clickLeave"
                  text="退出する"
                  button-type="none"
                  :is-clicked="isClick"
                  class="bg-red-600 text-white hover:bg-red-600/75"
                  @click="handleLeaveCourse"
                />
              </template>
            </BaseDialog>
          </div>
        </BaseDialogOverlay>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col items-center"
    >
      <BaseEmpty
        img-path="s-not-attending-course_ygslwv.png"
        img-alt="授業がまだ存在しません"
        explanation1="まだ授業に参加していません"
        explanation2="授業を追加して、振り返りを始めてみませんか？"
      />
    </div>
  </div>
</template>
