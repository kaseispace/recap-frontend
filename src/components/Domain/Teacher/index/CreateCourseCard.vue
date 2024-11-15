<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import type { FetchError } from 'ofetch'

const dialogRef = ref(null)
const isClick = ref(false)

const { authUser } = useAuth()
const { userInfo } = useUserApi()
const { teacherCourses, createCourse } = useCourseApi()
const { showSnackbar } = useSnackBar()
const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: CourseFormSchema,
  initialValues: {
    name: '',
    teacherName: userInfo.value?.user.name,
    dayOfWeek: '',
    courseTime: ''
  }
})
const { value: name } = useField<string>('name')
const { value: teacherName } = useField<string>('teacherName')
const { value: dayOfWeek } = useField<string>('dayOfWeek')
const { value: courseTime } = useField<string>('courseTime')
const { dialog: isDialog, openDialog, closeDialog } = useDialog(resetForm)
onClickOutside(dialogRef, closeDialog)

const onSelectWeek = (selectedDay: ValueText) => (dayOfWeek.value = selectedDay.text)
const onSelectSchedule = (selectedTime: ValueText) => (courseTime.value = selectedTime.text)

// 新規作成
const handleCreateCourse = handleSubmit(async (values) => {
  // nullチェック
  if (authUser.value && userInfo.value && values.teacherName) {
    isClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      const courseInfo = await createCourse(
        userInfo.value.school.id,
        values.name,
        values.teacherName,
        values.dayOfWeek,
        values.courseTime,
        idToken
      )
      if (teacherCourses.value) {
        teacherCourses.value.push(courseInfo)
        showSnackbar(SUCCESS_COURSE_CREATION, true)
        closeDialog()
      }
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 400:
          showSnackbar(ERROR_INVALID_DATE_FORMAT, false)
          break
        case 409:
          showSnackbar(ERROR_COURSE_ALREADY_EXISTS, false)
          break
        default:
          showSnackbar(ERROR_COURSE_CREATION_FAILED, false)
      }
    }
    finally {
      isClick.value = false
    }
  }
  else {
    showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
  }
})
</script>

<template>
  <div>
    <BaseButton
      data-testId="button"
      text="作成する"
      button-type="dialog"
      @click="openDialog"
    >
      <Icon
        name="mdi-light:plus"
        size="12px"
      />
    </BaseButton>

    <!-- 授業作成ダイアログ開始 -->
    <BaseDialogOverlay
      v-if="isDialog"
      data-testId="dialog"
    >
      <div
        data-testId="ref"
        class="flex w-full items-center justify-center px-4"
      >
        <BaseDialog
          ref="dialogRef"
          title="授業の作成"
          wide="small"
        >
          <!-- 授業名入力 -->
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
              data-testId="errorName"
              :text="errors.name"
            />
          </div>

          <!-- 教員名入力 -->
          <div>
            <BaseFormLabel
              text="教員名"
              input-for="teacherName"
            />
            <BaseFormTextInput
              v-model.trim="teacherName"
              data-testId="teacherName"
              input-id="teacherName"
              input-placeholder="佐藤太郎"
            />
            <BaseErrorValidationMessage
              v-if="errors.teacherName"
              data-testId="errorTeacherName"
              :text="errors.teacherName"
            />
          </div>

          <!-- 開講日選択 -->
          <div>
            <BaseFormLabel text="曜日" />
            <BaseMenu
              :selected-text="dayOfWeek"
              :menu-array="DAYS_OF_THE_WEEK"
              @select-menu="onSelectWeek"
            />
            <BaseErrorValidationMessage
              v-if="errors.dayOfWeek"
              data-testId="errorWeek"
              :text="errors.dayOfWeek"
            />
          </div>

          <!-- 授業時間選択 -->
          <div>
            <BaseFormLabel text="時限" />
            <BaseMenu
              :selected-text="courseTime"
              :menu-array="COURSE_SCHEDULE"
              @select-menu="onSelectSchedule"
            />
            <BaseErrorValidationMessage
              v-if="errors.courseTime"
              data-testId="errorTime"
              :text="errors.courseTime"
            />
          </div>

          <template #footer>
            <BaseButton
              data-testId="clickCancel"
              text="キャンセル"
              button-type="none"
              class="border border-slate-400 hover:bg-slate-100"
              @click="closeDialog"
            />

            <BaseButton
              data-testId="createButton"
              text="作成する"
              button-type="none"
              :is-clicked="isClick"
              class="bg-blue-600 text-white hover:bg-blue-600/75"
              @click="handleCreateCourse"
            />
          </template>
        </BaseDialog>
      </div>
    </BaseDialogOverlay>
    <!-- ダイアログ終了 -->
  </div>
</template>
