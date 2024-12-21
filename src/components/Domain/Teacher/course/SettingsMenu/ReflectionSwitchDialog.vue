<script setup lang="ts">
import type { FetchError } from 'ofetch'

interface Emits {
  (event: 'dialogClosed'): void
}

const emit = defineEmits<Emits>()
const dialogRef = ref(null)
const isClick = ref(false)

const { authUser } = useAuth()
const { courseDates, updateReflectionStatus } = useCourseDateApi()
const { dailyCourseReflections } = useReflectionHistory()
const { nextCourseDate } = useSetting()
const { showSnackbar } = useSnackBar()
const { dialog, openDialog, closeDialog } = useDialog()
onClickOutside(dialogRef, closeDialog)

// 授業日の振り返りの有無を更新
const handleUpdateReflectionStatus = async () => {
  if (authUser.value && nextCourseDate.value) {
    isClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      const courseDateInfo = await updateReflectionStatus(nextCourseDate.value.id, idToken)
      if (courseDates.value) {
        nextCourseDate.value = courseDateInfo
        const index = courseDates.value.findIndex(date => date.id === nextCourseDate.value?.id)
        courseDates.value[index] = courseDateInfo
      }

      if (dailyCourseReflections.value) {
        const index = dailyCourseReflections.value.findIndex(courseDay => courseDay.id === courseDateInfo.id)
        dailyCourseReflections.value[index] = {
          ...courseDateInfo,
          users_reflections: dailyCourseReflections.value[index].users_reflections
        }
      }

      showSnackbar(SUCCESS_COURSE_DATE_REFLECTION_UPDATE, true)
      closeDialog()
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 403:
          showSnackbar(ERROR_COURSE_DATE_REFLECTION_CANNOT_UPDATE, false)
          break
        case 404:
          showSnackbar(ERROR_COURSE_DATE_NOT_FOUND, false)
          break
        default:
          showSnackbar(ERROR_COURSE_DATE_REFLECTION_UPDATE_FAILED, false)
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
        title="振り返りの有無"
        wide="small"
      >
        <div data-testId="nextCourse">
          <p class="text-sm">
            次回の授業日は<span class="text-base font-semibold">{{ nextCourseDate?.course_date.substring(5) }}</span>です
          </p>
          <div v-if="nextCourseDate?.is_reflection === true">
            <p class="text-sm">
              この日に振り返りを<span class="text-base font-semibold text-blue-600">実施する</span>予定です
            </p>
          </div>

          <div v-else>
            <p class="text-sm">
              この日は振り返りを<span class="text-base font-semibold text-red-600">実施しない</span>予定です
            </p>
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
            data-testId="clickChange"
            text="変更する"
            button-type="none"
            :is-clicked="isClick"
            class="bg-blue-600 text-white hover:bg-blue-600/75"
            @click="handleUpdateReflectionStatus"
          />
        </template>
      </BaseDialog>
    </div>
  </BaseDialogOverlay>
</template>
