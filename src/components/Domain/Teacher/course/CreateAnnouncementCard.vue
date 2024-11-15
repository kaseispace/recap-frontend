<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import type { FetchError } from 'ofetch'

const isClick = ref(false)
const dialogRef = ref(null)

const { authUser } = useAuth()
const { courseUuid } = useCourseApi()
const { announcements, createAnnouncement } = useAnnouncementApi()
const { showSnackbar } = useSnackBar()
const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: AnnouncementSchema,
  initialValues: {
    content: ''
  }
})
const { value: content } = useField<string>('content')
const { dialog: isDialog, openDialog, closeDialog } = useDialog(resetForm)
onClickOutside(dialogRef, closeDialog)

const handleCreateAnnouncement = handleSubmit(async (values) => {
  if (authUser.value && courseUuid.value) {
    isClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      const announcementInfo = await createAnnouncement(courseUuid.value, values.content, idToken)
      if (announcements.value) {
        announcements.value.unshift(announcementInfo)
        showSnackbar(SUCCESS_ANNOUNCEMENT_CREATION, true)
        closeDialog()
      }
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 403:
          showSnackbar(ERROR_ANNOUNCEMENT_NOT_CREATOR, false)
          break
        default:
          showSnackbar(ERROR_ANNOUNCEMENT_CREATION_FAILED, false)
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
  <div class="mt-3 flex justify-end">
    <BaseButton
      data-testId="button"
      text="投稿する"
      button-type="dialog"
      @click="openDialog"
    >
      <Icon
        name="mdi-light:plus"
        size="12px"
      />
    </BaseButton>

    <BaseDialogOverlay
      v-if="isDialog"
      data-testId="dialog"
    >
      <div class="flex w-full justify-center px-4">
        <BaseDialog
          ref="dialogRef"
          title="お知らせを投稿"
          wide="large"
        >
          <!-- 中身スタート -->

          <BaseFormTextarea
            v-model.trim="content"
            data-testId="content"
            class="px-3"
            textarea-placeholder="ここにお知らせを入力"
            default-height="150px"
          />
          <BaseErrorValidationMessage
            v-if="errors.content"
            data-testId="errorContent"
            :text="errors.content"
          />

          <template #footer>
            <BaseButton
              data-testId="clickCancel"
              text="キャンセル"
              button-type="none"
              class="border border-slate-400 hover:bg-slate-100"
              @click="closeDialog"
            />

            <BaseButton
              data-testId="clickPost"
              text="投稿する"
              button-type="none"
              :is-clicked="isClick"
              class="bg-blue-600 text-white hover:bg-blue-600/75"
              @click="handleCreateAnnouncement"
            />
          </template>
        </BaseDialog>
      </div>
    </BaseDialogOverlay>
  </div>
</template>
