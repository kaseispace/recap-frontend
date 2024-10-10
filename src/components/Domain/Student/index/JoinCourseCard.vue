<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import type { FetchError } from 'ofetch'

const dialogRef = ref(null)
const isClick = ref(false)

const { authUser } = useAuth()
const { userInfo } = useUserApi()
const { studentCourses, joinCourse } = useUserCourseApi()
const { showSnackbar } = useSnackBar()
const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: CourseCodeSchema,
  initialValues: {
    courseCode: '',
  },
})
const { value: courseCode } = useField<string>('courseCode')
const { dialog, openDialog, closeDialog } = useDialog(resetForm)
onClickOutside(dialogRef, closeDialog)

const handleJoinCourse = handleSubmit(async (values) => {
  if (authUser.value && userInfo.value) {
    isClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      const courseInfo = await joinCourse(userInfo.value.school.id, values.courseCode, idToken)
      if (studentCourses.value) {
        studentCourses.value.push(courseInfo)
        showSnackbar(SUCCESS_COURSE_JOIN, true)
        closeDialog()
      }
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 404:
          showSnackbar(ERROR_COURSE_JOIN_NOT_FOUND, false)
          break
        case 409:
          showSnackbar(ERROR_COURSE_ALREADY_JOINED, false)
          break
        default:
          showSnackbar(ERROR_COURSE_JOIN_FAILURE, false)
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
      text="参加する"
      button-type="dialog"
      @click="openDialog"
    >
      <Icon
        name="mdi-light:plus"
        size="12px"
      />
    </BaseButton>

    <!-- ダイアログ開始 -->
    <BaseDialogOverlay
      v-if="dialog"
      data-testId="dialog"
    >
      <div class="flex w-full justify-center px-4">
        <BaseDialog
          ref="dialogRef"
          title="クラスコード"
          wide="small"
        >
          <p class="text-sm">
            {{ MESSAGE_COURSE_ENROLLMENT }}
          </p>

          <div>
            <BaseFormTextInput
              v-model="courseCode"
              data-testId="courseCode"
              input-placeholder="クラスコード"
            />
            <BaseErrorValidationMessage
              v-if="errors.courseCode"
              data-testId="errorCourseCode"
              :text="errors.courseCode"
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
              data-testId="clickJoin"
              text="参加する"
              button-type="none"
              :is-clicked="isClick"
              class="bg-cyan-600 text-white hover:bg-cyan-600/75"
              @click="handleJoinCourse"
            />
          </template>
        </BaseDialog>
      </div>
    </BaseDialogOverlay>
    <!-- ダイアログ終了 -->
  </div>
</template>
