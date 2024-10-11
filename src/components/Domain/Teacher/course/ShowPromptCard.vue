<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import type { FetchError } from 'ofetch'

const isLoading = ref(true)
const isEditClick = ref(false)
const isActivePromptClick = ref(false)
const isDeleteClick = ref(false)
const editDialogRef = ref(null)
const enableDialogRef = ref(null)
const deleteDialogRef = ref(null)
const promptId = ref(0)
const contents = ref<Array<{ content: string }>>([])

const { authUser } = useAuth()
const { courseUuid } = useCourseApi()
const { prompts, activePrompt, getTeacherPrompts, updatePrompt, updateActivePrompt, deletePrompt } = usePromptApi()
const { dialog: isEditDialog, openDialog: openEditDialog, closeDialog: closeEditDialog } = useDialog()
const { dialog: isEnableDialog, openDialog: openEnableDialog, closeDialog: closeEnableDialog } = useDialog()
const { dialog: isDeleteDialog, openDialog: openDeleteDialog, closeDialog: closeDeleteDialog } = useDialog()
const { showSnackbar } = useSnackBar()
const { errors, handleSubmit } = useForm({
  validationSchema: PromptSchema,
  initialValues: {
    title: '',
    content: ''
  }
})
const { value: title } = useField<string>('title')
const { value: content } = useField<string>('content')
onClickOutside(editDialogRef, closeEditDialog)
onClickOutside(enableDialogRef, closeEnableDialog)
onClickOutside(deleteDialogRef, closeDeleteDialog)

const addPromptContent = () => contents.value.push({ content: '' })
const removePromptContent = (contentIndex: number) => contents.value.splice(contentIndex, 1)

const handlePromptMultipleActions = (actionId: number, prompt: Prompt) => {
  promptId.value = prompt.id
  title.value = prompt.title
  // 現在登録されているプロンプト
  const registeredContents = prompt.prompt_questions.map(prompt => prompt.content)
  content.value = registeredContents[0]
  contents.value = []
  registeredContents.slice(1).forEach((prompt) => {
    contents.value.push({ content: prompt })
  })
  if (actionId === 1) {
    openEditDialog()
  }
  else if (actionId === 2) {
    openEnableDialog()
  }
  else if (actionId === 3) {
    openDeleteDialog()
  }
}

// 編集
const handleEditPrompt = handleSubmit(async (values) => {
  const extraContents = contents.value.map(item => item.content)
  const promptContents = [values.content, ...extraContents].filter(content => content !== '')
  if (authUser.value) {
    isEditClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      const promptInfo = await updatePrompt(promptId.value, values.title, promptContents, idToken)
      if (prompts.value) {
        const index = prompts.value.findIndex(prompt => prompt.id === promptId.value)
        prompts.value[index] = promptInfo
        if (promptId.value === activePrompt.value?.id) {
          activePrompt.value = promptInfo
        }
        showSnackbar(SUCCESS_PROMPT_UPDATE, true)
        closeEditDialog()
      }
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 403:
          showSnackbar(ERROR_PROMPT_CANNOT_UPDATE, false)
          break
        case 404:
          showSnackbar(ERROR_PROMPT_NOT_FOUND, false)
          break
        default:
          showSnackbar(ERROR_PROMPT_UPDATE_FAILED, false)
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

// 振り返りのactive
const handleActivePrompt = async () => {
  if (authUser.value) {
    isActivePromptClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      await updateActivePrompt(promptId.value, idToken)

      console.log(activePrompt.value)
      console.log(promptId.value)

      if (prompts.value) {
        // リクエストのあったプロンプトの特定
        const promptToUpdate = prompts.value.find(prompt => prompt.id === promptId.value)

        if (promptToUpdate) {
          // 既に有効済みな振り返りがある場合は、無効にする（見た目の変更）
          if (activePrompt.value) {
            const promptBeforeUpdate = prompts.value.find(prompt => prompt.id === activePrompt.value?.id)
            if (promptBeforeUpdate) {
              promptBeforeUpdate.active = false
            }

            // 有効済みな振り返りを無効にする際
            if (activePrompt.value?.id === promptId.value) {
              activePrompt.value = null
              showSnackbar(SUCCESS_PROMPT_DISABLED(title.value), true)
              closeEnableDialog()
              return
            }
          }

          // リクエストした振り返りのactive化（画面に反映）
          promptToUpdate.active = true
          activePrompt.value = promptToUpdate

          showSnackbar(SUCCESS_PROMPT_ENABLE(title.value), true)
          closeEnableDialog()
        }
      }
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 403:
          showSnackbar(ERROR_PROMPT_CANNOT_UPDATE, false)
          break
        case 404:
          showSnackbar(ERROR_PROMPT_NOT_FOUND, false)
          break
        default:
          showSnackbar(ERROR_PROMPT_SET_FAILED, false)
      }
    }
    finally {
      isActivePromptClick.value = false
    }
  }
  else {
    showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
  }
}

// 削除
const handleDeletePrompt = async () => {
  if (authUser.value) {
    isDeleteClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      await deletePrompt(promptId.value, idToken)
      if (prompts.value) {
        // 削除されたidに該当しないデータをフィルタリング
        prompts.value = prompts.value.filter(prompt => prompt.id !== promptId.value)
        // 削除したデータがactiveな場合、activeReflectionを初期化
        if (promptId.value === activePrompt.value?.id) {
          activePrompt.value = null
        }
        showSnackbar(SUCCESS_PROMPT_DELETION, true)
        closeDeleteDialog()
      }
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 403:
          showSnackbar(ERROR_PROMPT_CANNOT_DELETE, false)
          break
        case 404:
          showSnackbar(ERROR_PROMPT_NOT_FOUND, false)
          break
        default:
          showSnackbar(ERROR_PROMPT_DELETION_FAILED, false)
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
  try {
    if (!authUser.value || !courseUuid.value) {
      showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
      return
    }

    // プロンプトを既に取得済みの場合は何もしない
    if (prompts.value) return

    const idToken = await authUser.value.getIdToken()
    prompts.value = await getTeacherPrompts(courseUuid.value, idToken)
    if (prompts.value) {
      // マウント時にactiveな振り返りを保持しておく、無い場合はnull
      activePrompt.value = prompts.value.find(prompt => prompt.active === true) || null
    }
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
    class="flex h-64 items-center justify-center"
  >
    <!-- ローディング中のコンポーネント -->
    <BaseLoading border-color="border-blue-900" />
  </div>

  <div v-else>
    <div v-if="prompts && prompts.length > 0">
      <div class="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(prompt, i) in prompts"
          :key="i"
        >
          <BaseCardPrompt
            :data-testId="`prompt-${i}`"
            :title="prompt.title"
            :contents="prompt.prompt_questions"
            :is-selected="prompt.active"
            bg-color="bg-blue-900"
          >
            <template #moreIcon>
              <BaseMore
                :menu-array="teacherPromptSetting"
                hover-bgcolor="hover:bg-blue-400/50"
                @select-menu="(emittedItem) => handlePromptMultipleActions(emittedItem, prompt)"
              >
                <Icon
                  name="mi:options-vertical"
                  size="20px"
                  style="color: white"
                />
              </BaseMore>
            </template>

            <template #promptIcon>
              <Icon
                name="mdi:chat-question"
                size="28px"
                style="color: white"
              />
            </template>

            <template #badgeIcon>
              <Icon
                :data-testId="`badge-${i}`"
                name="mdi:check"
                size="20px"
                style="color: white"
              />
            </template>
          </BaseCardPrompt>
        </div>
      </div>

      <!-- 振り返り編集用ダイアログ -->
      <BaseDialogOverlay
        v-if="isEditDialog"
        data-testId="editDialog"
      >
        <div class="flex w-full justify-center px-4">
          <BaseDialog
            ref="editDialogRef"
            title="振り返りの編集"
            wide="large"
          >
            <!-- 振り返り入力 -->

            <div>
              <BaseFormLabel
                text="タイトル"
                input-for="title"
              />
              <BaseFormTextInput
                v-model="title"
                input-id="title"
                input-placeholder="第〇回目の振り返り"
              />
              <BaseErrorValidationMessage
                v-if="errors.title"
                :text="errors.title"
              />
            </div>

            <div>
              <BaseFormLabel
                text="Q1"
                input-for="content1"
              />
              <BaseFormTextInput
                v-model="content"
                input-id="content1"
                :input-placeholder="examplePrompt"
              />
              <BaseErrorValidationMessage
                v-if="errors.content"
                :text="errors.content"
              />
            </div>

            <template
              v-for="(extraContent, i) in contents"
              :key="i"
            >
              <div>
                <BaseFormLabel
                  :text="'Q' + (i + 2)"
                  :input-for="'content' + (i + 2)"
                />
                <div class="flex">
                  <BaseFormTextInput
                    v-model="extraContent.content"
                    :data-testId="`extraContent-${i}`"
                    :input-id="'content' + (i + 2)"
                  />

                  <BaseButton
                    :data-testId="`removeButton-${i}`"
                    button-type="icon"
                    class="ml-4 border border-slate-400 hover:bg-slate-100"
                    @click="removePromptContent(i)"
                  >
                    <Icon
                      name="mdi:delete-outline"
                      size="24px"
                    />
                  </BaseButton>
                </div>
              </div>
            </template>

            <template #footer>
              <BaseButton
                data-testId="addButton"
                class="group relative border border-slate-400 p-2 hover:bg-slate-100"
                button-type="icon"
                @click="addPromptContent"
              >
                <BaseTooltip
                  class="bottom-12"
                  message="追加"
                />
                <Icon
                  name="mdi:add-circle-outline"
                  size="24px"
                />
              </BaseButton>

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
                @click="handleEditPrompt"
              />
            </template>
          </BaseDialog>
        </div>
      </BaseDialogOverlay>

      <!-- 振り返り有効用ダイアログ -->
      <BaseDialogOverlay
        v-if="isEnableDialog"
        data-testId="statusDialog"
      >
        <div class="flex w-full justify-center px-4">
          <BaseDialog
            ref="enableDialogRef"
            :title="activePrompt?.id === promptId ? '振り返りの無効' : ' 振り返りの有効'"
            wide="small"
          >
            <div class="text-sm">
              <p>{{ activePrompt?.id === promptId ? MESSAGE_PROMPT_DISABLE : MESSAGE_PROMPT_ENABLE }}</p>
              <p>{{ activePrompt?.id === promptId ? '' : MESSAGE_PROMPT_DISABLE_WARNING }}</p>
            </div>

            <!-- 振り返り入力 -->

            <template #footer>
              <BaseButton
                text="キャンセル"
                button-type="none"
                class="border border-slate-400 hover:bg-slate-100"
                @click="closeEnableDialog"
              />

              <BaseButton
                v-if="activePrompt?.id === promptId"
                data-testId="clickDisable"
                text="無効にする"
                button-type="none"
                :is-clicked="isActivePromptClick"
                class="bg-red-600 text-white hover:bg-red-600/75"
                @click="handleActivePrompt"
              />

              <BaseButton
                v-else
                data-testId="clickEnable"
                text="有効にする"
                button-type="none"
                :is-clicked="isActivePromptClick"
                class="bg-blue-600 text-white hover:bg-blue-600/75"
                @click="handleActivePrompt"
              />
            </template>
          </BaseDialog>
        </div>
      </BaseDialogOverlay>

      <!-- 振り返り削除用ダイアログ -->
      <BaseDialogOverlay
        v-if="isDeleteDialog"
        data-testId="deleteDialog"
      >
        <div class="flex w-full justify-center px-4">
          <BaseDialog
            ref="deleteDialogRef"
            title="振り返りの削除"
            wide="small"
          >
            <div class="text-sm">
              <p>{{ MESSAGE_PROMPT_DELETION }}</p>
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
                @click="handleDeletePrompt"
              />
            </template>
          </BaseDialog>
        </div>
      </BaseDialogOverlay>
    </div>

    <div v-else>
      <div class="mt-5 flex flex-col items-center">
        <BaseEmpty
          img-path="t-empty-prompt_ukzof3.png"
          img-alt="プロンプトがまだ存在しません"
          explanation1="プロンプトがまだ作成されていません"
          explanation2="学生の理解を深めるために、新しいプロンプトを作成しましょう！"
        />
      </div>
    </div>
  </div>
</template>
