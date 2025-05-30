<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import type { FetchError } from 'ofetch'

const editDialogRef = ref(null)
const deleteDialogRef = ref(null)
const isEditClick = ref(false)
const isDeleteClick = ref(false)

const { authUser } = useAuth()
const { teacherCourses, courseUuid, isTeacherCourseLoading, updateCourse, deleteCourse } = useCourseApi()
const { dialog: isEditDialog, openDialog: openEditDialog, closeDialog: closeEditDialog } = useDialog()
const { dialog: isDeleteDialog, openDialog: openDeleteDialog, closeDialog: closeDeleteDialog } = useDialog()
const { showSnackbar } = useSnackBar()
const { errors, handleSubmit } = useForm({
  validationSchema: CourseFormSchema,
  initialValues: {
    name: '',
    teacherName: '',
    dayOfWeek: '',
    courseTime: ''
  }
})
const { value: name } = useField<string>('name')
const { value: teacherName } = useField<string>('teacherName')
const { value: dayOfWeek } = useField<string>('dayOfWeek')
const { value: courseTime } = useField<string>('courseTime')
onClickOutside(editDialogRef, closeEditDialog)
onClickOutside(deleteDialogRef, closeDeleteDialog)

const handleEditOrDeleteAction = (actionId: number, course: Course) => {
  courseUuid.value = course.uuid
  name.value = course.name
  teacherName.value = course.teacher_name
  dayOfWeek.value = course.day_of_week
  courseTime.value = course.course_time

  if (actionId === 1) {
    openEditDialog()
  }
  else if (actionId === 2) {
    openDeleteDialog()
  }
}

const onSelectWeek = (text: ValueText) => (dayOfWeek.value = text.text)
const onSelectSchedule = (text: ValueText) => (courseTime.value = text.text)

// 編集
const handleEditCourse = handleSubmit(async (values) => {
  if (authUser.value && courseUuid.value) {
    isEditClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      const courseInfo = await updateCourse(
        courseUuid.value,
        values.name,
        values.teacherName,
        values.dayOfWeek,
        values.courseTime,
        idToken
      )
      if (teacherCourses.value) {
        const index = teacherCourses.value.findIndex(course => course.uuid === courseUuid.value)
        teacherCourses.value[index] = courseInfo
        showSnackbar(SUCCESS_COURSE_UPDATE, true)
        closeEditDialog()
      }
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 403:
          showSnackbar(ERROR_COURSE_NOT_CREATOR_EDIT, false)
          break
        case 409:
          showSnackbar(ERROR_COURSE_ALREADY_EXISTS, false)
          break
        default:
          showSnackbar(ERROR_COURSE_UPDATE_FAILED, false)
      }
    }
    finally {
      isEditClick.value = false
    }
  }
  else {
    showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
  }
})

// 削除
const handleDeleteCourse = async () => {
  if (authUser.value && courseUuid.value) {
    isDeleteClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      await deleteCourse(courseUuid.value, idToken)
      if (teacherCourses.value) {
        teacherCourses.value = teacherCourses.value.filter(course => course.uuid !== courseUuid.value)
        showSnackbar(SUCCESS_COURSE_DELETION, true)
        closeDeleteDialog()
      }
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 403:
          showSnackbar(ERROR_COURSE_NOT_CREATOR_DELETE, false)
          break
        default:
          showSnackbar(ERROR_COURSE_DELETION_FAILED, false)
      }
    }
    finally {
      isDeleteClick.value = false
    }
  }
  else {
    showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
  }
}
</script>

<template>
  <div v-if="isTeacherCourseLoading">
    <div class="grid grid-cols-1 gap-x-4 gap-y-7 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
      <template
        v-for="n in 16"
        :key="n"
      >
        <BaseSkeletonCourseCard />
      </template>
    </div>
  </div>

  <div v-else>
    <div v-if="teacherCourses && teacherCourses.length > 0">
      <div class="grid grid-cols-1 gap-x-4 gap-y-7 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
        <template
          v-for="(course, i) in teacherCourses"
          :key="course"
        >
          <BaseCard
            :data-testId="`card-${i}`"
            :subject-name="course.name"
            :path-name="TEACHER_COURSE_DETAIL"
            :param-id="course.uuid"
            bg-color="bg-blue-900"
          >
            <template #moreIcon>
              <BaseMore
                :menu-array="TEACHER_COURSE_SETTINGS"
                hover-bgcolor="hover:bg-blue-400/50"
                @click.prevent
                @select-menu="(emittedItem) => handleEditOrDeleteAction(emittedItem, course)"
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
          v-if="isEditDialog"
          data-testId="editDialog"
        >
          <div class="flex w-full justify-center px-4">
            <BaseDialog
              ref="editDialogRef"
              title="授業の編集"
              wide="small"
            >
              <div>
                <BaseFormLabel
                  text="授業名"
                  input-for="name"
                />
                <BaseFormTextInput
                  v-model.trim="name"
                  data-testId="name"
                  input-id="name"
                  input-placeholder="データサイエンス入門"
                />
                <BaseErrorValidationMessage
                  v-if="errors.name"
                  :text="errors.name"
                />
              </div>

              <div>
                <BaseFormLabel
                  text="教員名"
                  input-for="teacherName"
                />
                <BaseFormTextInput
                  v-model.trim="teacherName"
                  input-id="teacherName"
                  input-placeholder="佐藤太郎"
                />
                <BaseErrorValidationMessage
                  v-if="errors.teacherName"
                  :text="errors.teacherName"
                />
              </div>

              <div>
                <BaseFormLabel text="曜日" />
                <BaseMenu
                  :selected-text="dayOfWeek"
                  :menu-array="DAYS_OF_THE_WEEK"
                  @select-menu="onSelectWeek"
                />
                <BaseErrorValidationMessage
                  v-if="errors.dayOfWeek"
                  :text="errors.dayOfWeek"
                />
              </div>

              <div>
                <BaseFormLabel text="時限" />
                <BaseMenu
                  :selected-text="courseTime"
                  :menu-array="COURSE_SCHEDULE"
                  @select-menu="onSelectSchedule"
                />
                <BaseErrorValidationMessage
                  v-if="errors.courseTime"
                  :text="errors.courseTime"
                />
              </div>

              <template #footer>
                <BaseButton
                  text="キャンセル"
                  button-type="none"
                  class="border border-slate-400 hover:bg-slate-100"
                  @click="closeEditDialog"
                />

                <BaseButton
                  data-testId="clickEdit"
                  text="変更する"
                  button-type="none"
                  :is-clicked="isEditClick"
                  class="bg-blue-600 text-white hover:bg-blue-600/75"
                  @click="handleEditCourse"
                />
              </template>
            </BaseDialog>
          </div>
        </BaseDialogOverlay>

        <BaseDialogOverlay
          v-if="isDeleteDialog"
          data-testId="deleteDialog"
        >
          <div class="flex w-full justify-center px-4">
            <BaseDialog
              ref="deleteDialogRef"
              title="授業の削除"
              wide="small"
            >
              <p class="text-sm">
                {{ MESSAGE_COURSE_DELETION }}
              </p>

              <div class="w-full space-y-1 rounded-md bg-gray-200 p-3 text-sm">
                <p>授業内のお知らせ</p>
                <p>授業内のプロンプト</p>
                <p>授業に参加しているユーザーの振り返り</p>
              </div>

              <template #footer>
                <BaseButton
                  text="キャンセル"
                  button-type="none"
                  class="border border-slate-400 hover:bg-slate-100"
                  @click="closeDeleteDialog"
                />

                <BaseButton
                  data-testId="clickDelete"
                  text="削除する"
                  button-type="none"
                  :is-clicked="isDeleteClick"
                  class="bg-red-600 text-white hover:bg-red-600/75"
                  @click="handleDeleteCourse"
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
        img-path="t-empty-courses_i01dtl.png"
        img-alt="授業がまだ存在しません"
        explanation1="まだ授業がありません"
        explanation2="新しい授業を作成して、学生の学習をサポートしましょう！"
      />
    </div>
  </div>
</template>
