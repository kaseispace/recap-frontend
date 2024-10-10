<script setup lang="ts">
import type { FetchError } from 'ofetch'

interface Emits {
  (event: 'dialogClosed'): void
}

const emit = defineEmits<Emits>()
const dialogRef = ref(null)
const isClick = ref(false)

const { authUser } = useAuth()
const { courseDates, deleteCourseDate } = useCourseDateApi()
const { teacherReflectionFlag } = useReflectionApi()
const { dailyCourseReflections } = useReflectionHistory()
const { nextCourseDate } = useSetting()
const { showSnackbar } = useSnackBar()
const { dialog, openDialog, closeDialog } = useDialog()
onClickOutside(dialogRef, closeDialog)

// 授業日の削除
const handleDeleteCourseDay = async () => {
  if (authUser.value && nextCourseDate.value) {
    isClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      await deleteCourseDate(nextCourseDate.value.id, idToken)
      if (courseDates.value) {
        courseDates.value = courseDates.value.filter(date => date.id !== nextCourseDate.value?.id)
      }

      if (dailyCourseReflections.value) {
        dailyCourseReflections.value = dailyCourseReflections.value.filter(
          courseDay => courseDay.id !== nextCourseDate.value?.id,
        )
      }

      if (teacherReflectionFlag.value === true) {
        teacherReflectionFlag.value = null
      }

      // 全ての処理が終わった時に初期化
      nextCourseDate.value = undefined
      showSnackbar(SUCCESS_COURSE_DATE_DELETION, true)
      closeDialog()
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 403:
          showSnackbar(ERROR_COURSE_DATE_CANNOT_DELETE, false)
          break
        case 404:
          showSnackbar(ERROR_COURSE_DATE_NOT_FOUND, false)
          break
        default:
          showSnackbar(ERROR_COURSE_DATE_DELETION_FAILED, false)
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
        title="授業日の削除"
        wide="small"
      >
        <div data-testId="nextCourse">
          <p class="text-sm">
            次回の授業日は<span class="text-base font-semibold">{{ nextCourseDate?.course_date.substring(5) }}</span>です
          </p>
          <p class="text-sm">
            授業日を削除しますか？
          </p>
          <p
            v-if="teacherReflectionFlag"
            class="text-sm"
          >
            本日の振り返りを既に登録している学生がいます
          </p>
          <p
            v-if="teacherReflectionFlag"
            class="text-sm"
          >
            削除すると、既に登録された振り返りも削除されます
          </p>
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
            data-testId="clickDelete"
            text="削除する"
            button-type="none"
            :is-clicked="isClick"
            class="bg-red-600 text-white hover:bg-red-600/75"
            @click="handleDeleteCourseDay"
          />
        </template>
      </BaseDialog>
    </div>
  </BaseDialogOverlay>
</template>
