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
const { courseUuid, joinedUsers } = useCourseApi()
const { courseDates, createCourseDate } = useCourseDateApi()
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

// 授業日の追加
const handleAddCourseDay = handleSubmit(async (values) => {
  const formattedSession = `第${values.courseSession}回`
  // nullチェック
  if (authUser.value && courseUuid.value) {
    isClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      const courseDateInfo = await createCourseDate(courseUuid.value, formattedSession, values.courseDate, idToken)
      // 授業日一覧を更新
      if (courseDates.value) {
        nextCourseDate.value = courseDateInfo
        courseDates.value.push(courseDateInfo)
      }

      // 振り返り履歴を既に取得済みの場合は更新する(振り返り履歴タブを表示した場合)
      // まだ未取得の場合はその時に追加分も取得されるので特に何もしない
      if (dailyCourseReflections.value && joinedUsers.value && joinedUsers.value.length > 0) {
        const dummyUsersReflections = joinedUsers.value.map(user => ({
          id: user.id,
          name: user.name,
          reflections: [],
        }))
        dailyCourseReflections.value.push({ ...courseDateInfo, users_reflections: dummyUsersReflections })
      }
      else {
        console.log('まだないから更新しないよ')
      }

      showSnackbar(SUCCESS_COURSE_DATE_CREATION, true)
      closeDialog()
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 409:
          showSnackbar(ERROR_COURSE_DATE_ALREADY_EXISTS, false)
          break
        default:
          showSnackbar(ERROR_COURSE_DATE_CREATION_FAILED, false)
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
        title="授業日の追加"
        wide="small"
      >
        <div
          data-testId="noNextCourse"
          class="space-y-4"
        >
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
            <BaseCalendar @date-selected="onDateSelected" />
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
            data-testId="clickAdd"
            text="追加する"
            button-type="none"
            :is-clicked="isClick"
            class="bg-blue-600 text-white hover:bg-blue-600/75"
            @click="handleAddCourseDay"
          />
        </template>
      </BaseDialog>
    </div>
  </BaseDialogOverlay>
</template>
