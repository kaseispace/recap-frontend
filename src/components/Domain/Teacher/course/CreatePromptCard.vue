<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import type { FetchError } from 'ofetch'

const dialogRef = ref(null)
const isClick = ref(false)
const contents = ref<PromptContent[]>([])
const promptQuestions = ref<PromptContent[]>([])

const { authUser } = useAuth()
const { courseUuid } = useCourseApi()
const { prompts, createPrompt } = usePromptApi()
const { showSnackbar } = useSnackBar()
const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: PromptSchema,
  initialValues: {
    title: '',
    content: ''
  }
})
const { value: title } = useField<string>('title')
const { value: content } = useField<string>('content')
const { dialog: isDialog, openDialog, closeDialog } = useDialog(resetForm)
onClickOutside(dialogRef, closeDialog)

const addPromptContent = () => contents.value.push({ content: '' })
const removePromptContent = (contentIndex: number) => contents.value.splice(contentIndex, 1)

// 振り返り作成
const handleCreatePrompt = handleSubmit(async (values) => {
  // 空白・スペースの確認
  const filteredContents = contents.value.filter(content => content.content && content.content.trim() !== '')
  promptQuestions.value.push({ content: values.content }, ...filteredContents)
  if (authUser.value && courseUuid.value) {
    isClick.value = true
    try {
      const idToken = await authUser.value.getIdToken()
      const promptInfo = await createPrompt(courseUuid.value, values.title, promptQuestions.value, idToken)
      if (prompts.value) {
        prompts.value.push(promptInfo)
        showSnackbar(SUCCESS_PROMPT_CREATION, true)
        closeDialog()
      }
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 403:
          showSnackbar(ERROR_PROMPT_NOT_CREATOR, false)
          break
        default:
          showSnackbar(ERROR_PROMPT_CREATION_FAILED, false)
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

// 振り返りの追加用変数contentsは、resetFormの対処以外なので、isDialogを監視して初期化
watch(isDialog, () => {
  contents.value = []
  promptQuestions.value = []
})
</script>

<template>
  <div class="mt-3 flex justify-end">
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

    <BaseDialogOverlay
      v-if="isDialog"
      data-testId="dialog"
    >
      <div class="flex w-full justify-center px-4">
        <BaseDialog
          ref="dialogRef"
          title="振り返りを作成"
          wide="large"
        >
          <!-- 中身スタート -->

          <div>
            <BaseFormLabel
              text="タイトル"
              input-for="title"
            />
            <BaseFormTextInput
              v-model="title"
              data-testId="title"
              input-id="title"
              input-placeholder="第〇回目の振り返り"
            />
            <BaseErrorValidationMessage
              v-if="errors.title"
              data-testId="errorTitle"
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
              data-testId="content"
              input-id="content1"
              :input-placeholder="EXAMPLE_PROMPT"
            />
            <BaseErrorValidationMessage
              v-if="errors.content"
              data-testId="errorContent"
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
                  class="group relative ml-4 border border-slate-400 p-2 hover:bg-slate-100"
                  @click="removePromptContent(i)"
                >
                  <BaseTooltip
                    class="bottom-12"
                    message="削除"
                  />
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
              data-testId="clickCancel"
              text="キャンセル"
              button-type="none"
              class="border border-slate-400 hover:bg-slate-100"
              @click="closeDialog"
            />

            <BaseButton
              data-testId="clickCreate"
              text="作成する"
              button-type="none"
              :is-clicked="isClick"
              class="bg-blue-600 text-white hover:bg-blue-600/75"
              @click="handleCreatePrompt"
            />
          </template>
        </BaseDialog>
      </div>
    </BaseDialogOverlay>
  </div>
</template>
