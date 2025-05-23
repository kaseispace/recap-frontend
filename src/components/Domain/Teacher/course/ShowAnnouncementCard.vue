<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import type { FetchError } from 'ofetch'

const isLoading = ref(true)
const isEditClick = ref(false)
const isDeleteClick = ref(false)
const editDialogRef = ref(null)
const deleteDialogRef = ref(null)
const announcementId = ref(0)

const { authUser } = useAuth()
const { courseUuid } = useCourseApi()
const { announcements, getTeacherAnnouncements, updateAnnouncement, deleteAnnouncement } = useAnnouncementApi()
const { dialog: isEditDialog, openDialog: openEditDialog, closeDialog: closeEditDialog } = useDialog()
const { dialog: isDeleteDialog, openDialog: openDeleteDialog, closeDialog: closeDeleteDialog } = useDialog()
const { showSnackbar } = useSnackBar()
const { errors, handleSubmit } = useForm({
  validationSchema: AnnouncementSchema,
  initialValues: {
    content: ''
  }
})
const { value: content } = useField<string>('content')
onClickOutside(editDialogRef, closeEditDialog)
onClickOutside(deleteDialogRef, closeDeleteDialog)

const handleAnnouncementEditOrDeleteAction = (actionId: number, announcement: Announcement) => {
  announcementId.value = announcement.id
  content.value = announcement.content
  if (actionId === 1) {
    openEditDialog()
  }
  else if (actionId === 2) {
    openDeleteDialog()
  }
}

// 編集
const handleEditAnnouncement = handleSubmit(async (values) => {
  if (authUser.value) {
    isEditClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      const announcementInfo = await updateAnnouncement(announcementId.value, values.content, idToken)
      if (announcements.value) {
        const index = announcements.value.findIndex(announcement => announcement.id === announcementId.value)

        announcements.value[index] = announcementInfo
        showSnackbar(SUCCESS_ANNOUNCEMENT_UPDATE, true)
        closeEditDialog()
      }
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 403:
          showSnackbar(ERROR_ANNOUNCEMENT_CANNOT_UPDATE, false)
          break
        case 404:
          showSnackbar(ERROR_ANNOUNCEMENT_NOT_FOUND, false)
          break
        default:
          showSnackbar(ERROR_ANNOUNCEMENT_UPDATE_FAILED, false)
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
const handleDeleteAnnouncement = async () => {
  if (authUser.value) {
    isDeleteClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      await deleteAnnouncement(announcementId.value, idToken)
      if (announcements.value) {
        announcements.value = announcements.value.filter(announcement => announcement.id !== announcementId.value)
        showSnackbar(SUCCESS_ANNOUNCEMENT_DELETION, true)
        closeDeleteDialog()
      }
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 403:
          showSnackbar(ERROR_ANNOUNCEMENT_CANNOT_DELETE, false)
          break
        case 404:
          showSnackbar(ERROR_ANNOUNCEMENT_NOT_FOUND, false)
          break
        default:
          showSnackbar(ERROR_ANNOUNCEMENT_DELETION_FAILED, false)
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

onMounted(async () => {
  await nextTick()
  try {
    if (!authUser.value || !courseUuid.value) {
      showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
      return
    }

    if (announcements.value) return

    const idToken = await authUser.value.getIdToken()
    announcements.value = await getTeacherAnnouncements(courseUuid.value, idToken)
  }
  catch {
    showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
  }
  finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div
    v-if="isLoading"
    class="mt-7"
  >
    <template
      v-for="n in 4"
      :key="n"
    >
      <div class="sm:grid sm:grid-cols-8">
        <BaseSkeletonAnnouncementCard class="sm:col-span-6 sm:col-start-2" />
      </div>
    </template>
  </div>

  <div v-else>
    <div v-if="announcements && announcements.length > 0">
      <div class="mt-7">
        <template
          v-for="(announcement, i) in announcements"
          :key="announcement"
        >
          <div class="sm:grid sm:grid-cols-8">
            <BaseCardAnnouncement
              :data-testId="`announcement-${i}`"
              class="sm:col-span-6 sm:col-start-2"
              :content="announcement.content"
              :date-time="announcement.created_at"
              :is-edited="announcement.created_at !== announcement.updated_at"
            >
              <BaseMore
                :menu-array="TEACHER_COURSE_SETTINGS"
                hover-bgcolor="hover:bg-slate-300/50"
                :icon-color="false"
                @select-menu="(emittedItem) => handleAnnouncementEditOrDeleteAction(emittedItem, announcement)"
              >
                <Icon
                  name="mi:options-vertical"
                  size="20px"
                />
              </BaseMore>
            </BaseCardAnnouncement>
          </div>
        </template>
      </div>

      <BaseDialogOverlay
        v-if="isEditDialog"
        data-testId="editDialog"
      >
        <div class="flex w-full justify-center px-4">
          <BaseDialog
            ref="editDialogRef"
            title="お知らせの編集"
            wide="large"
          >
            <BaseFormTextarea
              v-model.trim="content"
              data-testId="content"
              class="px-3"
              textarea-placeholder="ここにお知らせを入力"
              default-height="150px"
            />
            <BaseErrorValidationMessage
              v-if="errors.content"
              :text="errors.content"
            />

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
                @click="handleEditAnnouncement"
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
            title="お知らせの削除"
            wide="small"
          >
            <div class="text-sm">
              <p>{{ MESSAGE_ANNOUNCEMENT_DELETION }}</p>
              <p>{{ MESSAGE_DELETION }}</p>
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
                @click="handleDeleteAnnouncement"
              />
            </template>
          </BaseDialog>
        </div>
      </BaseDialogOverlay>
    </div>

    <div v-else>
      <div class="mt-5 flex flex-col items-center">
        <BaseEmpty
          img-path="t-empty-announcement_nqe2bm.png"
          img-alt="お知らせがまだ存在しません"
          explanation1="現在、お知らせはありません"
          explanation2="何か学生に伝えたい情報があれば、お知らせを作成してください"
        />
      </div>
    </div>
  </div>
</template>
