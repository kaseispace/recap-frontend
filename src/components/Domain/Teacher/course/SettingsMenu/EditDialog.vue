<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import type { FetchError } from 'ofetch'

interface Emits {
  (event: 'dialogClosed'): void
}

const emit = defineEmits<Emits>()
const dialogRef = ref(null)
const isClick = ref(false)

const { authUser } = useAuth()
const { courseDates, updateCourseDate } = useCourseDateApi()
const { dailyCourseReflections } = useReflectionHistory()
const { nextCourseDate } = useSetting()
const { showSnackbar } = useSnackBar()
const { errors, handleSubmit } = useForm({
  validationSchema: CourseDateSchema,
  initialValues: {
    courseSession: '',
    courseDate: '',
  },
})
const { value: courseSession } = useField<string>('courseSession')
const { value: courseDate } = useField<string>('courseDate')
const { dialog, openDialog, closeDialog } = useDialog()
onClickOutside(dialogRef, closeDialog)

const onDateSelected = (selectedDate: string) => (courseDate.value = selectedDate)

// 授業日の編集
const handleEditCourseDay = handleSubmit(async (values) => {
  const formattedSession = `第${values.courseSession}回`
  // nullチェック
  if (authUser.value && nextCourseDate.value) {
    if (
      values.courseSession === nextCourseDate.value.course_number
      && values.courseDate === nextCourseDate.value.course_date
    ) {
      showSnackbar(ERROR_COURSE_DATE_CANNOT_UPDATE, false)
      return
    }
    isClick.value = true

    try {
      const idToken = await authUser.value.getIdToken()
      const courseDateInfo = await updateCourseDate(
        nextCourseDate.value.id,
        formattedSession,
        values.courseDate,
        idToken,
      )
      if (courseDates.value) {
        // 更新
        nextCourseDate.value = courseDateInfo
        const index = courseDates.value.findIndex(date => date.id === nextCourseDate.value?.id)
        courseDates.value[index] = courseDateInfo
      }

      // 既に取得済みの場合のみ更新を行う
      if (dailyCourseReflections.value) {
        const index = dailyCourseReflections.value.findIndex(courseDay => courseDay.id === courseDateInfo.id)
        dailyCourseReflections.value[index] = {
          ...courseDateInfo,
          users_reflections: dailyCourseReflections.value[index].users_reflections,
        }
      }

      showSnackbar(SUCCESS_COURSE_DATE_UPDATE, true)
      closeDialog()
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 409:
          showSnackbar(ERROR_COURSE_DATE_ALREADY_EXISTS, false)
          break
        default:
          showSnackbar(ERROR_COURSE_DATE_UPDATE_FAILED, false)
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

watch(dialog, () => {
  if (dialog.value === false) {
    emit('dialogClosed')
  }
})

onMounted(() => {
  openDialog()
  if (nextCourseDate.value) {
    courseSession.value = nextCourseDate.value.course_number.slice(1, -1)
    courseDate.value = nextCourseDate.value.course_date
  }
})
</script>

<template>
  <BaseDialogOverlay
    v-if="dialog"
    data-testId="dialog"
  >
    <div class="flex w-full justify-center px-4">
      <BaseDialog
        ref="dialogRef"
        title="授業日の編集"
        wide="small"
      >
        <div
          data-testId="nextCourse"
          class="space-y-4"
        >
          <p class="text-sm">
            次回の授業日は<span class="text-base font-semibold">{{ nextCourseDate?.course_date.substring(5) }}</span>です
          </p>

          <div>
            <BaseFormLabel
              text="授業回"
              input-for="courseNumber"
            />
            <BaseFormTextInput
              v-model="courseSession"
              input-id="courseNumber"
              input-placeholder="1"
              wide="w-20"
            />
            <BaseErrorValidationMessage
              v-if="errors.courseSession"
              :text="errors.courseSession"
            />
          </div>

          <div>
            <BaseFormLabel text="授業日" />
            <BaseCalendar
              :course-date="courseDate"
              @date-selected="onDateSelected"
            />
            <BaseErrorValidationMessage
              v-if="errors.courseDate"
              :text="errors.courseDate"
            />
          </div>
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
            data-testId="clickEdit"
            text="編集する"
            button-type="none"
            :is-clicked="isClick"
            class="bg-blue-600 text-white hover:bg-blue-600/75"
            @click="handleEditCourseDay"
          />
        </template>
      </BaseDialog>
    </div>
  </BaseDialogOverlay>
</template>
