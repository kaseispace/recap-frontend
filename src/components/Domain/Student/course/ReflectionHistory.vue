<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import type { FetchError } from 'ofetch'

const beforeMessage = ref('')
const activeTabId = ref(0)
const dateId = ref(0)
const reflectionId = ref(0)
const dialogRef = ref(null)
const isLoading = ref(true)
const isClick = ref(false)

const { authUser } = useAuth()
const { courseUuid } = useCourseApi()
const { studentReflections, getStudentReflection, updateReflection } = useReflectionApi()
const { studentFeedbacks, getStudentFeedbacks } = useFeedbackApi()
const { dialog, openDialog, closeDialog } = useDialog()
const { showSnackbar } = useSnackBar()
const { errors, handleSubmit } = useForm({
  validationSchema: ReflectionSchema,
  initialValues: {
    message: ''
  }
})
const { value: message } = useField<string>('message')
onClickOutside(dialogRef, closeDialog)

const setTab = (num: number) => (activeTabId.value = num)

// 編集ボタン
const handleEditAction = (date: CourseDate, reflection: Reflection) => {
  beforeMessage.value = reflection.message
  reflectionId.value = reflection.id
  message.value = reflection.message
  dateId.value = date.id
  openDialog()
}

const check = (course: StudentCourseReflection) => {
  if (studentFeedbacks.value) {
    const feedback = studentFeedbacks.value.find(item => item.course_date_id === course.reflections[0].course_date_id)
    return feedback?.comment
  }
}

// 振り返りの編集
const handleEditReflection = handleSubmit(async (values) => {
  if (authUser.value) {
    //  編集前後で変更ない
    if (beforeMessage.value === values.message) {
      showSnackbar(ERROR_REFLECTION_CANNOT_UPDATE, false)
      return
    }
    isClick.value = true

    try {
      const idToken = await authUser.value.getIdToken()
      const reflectionInfo = await updateReflection(reflectionId.value, values.message, idToken)

      if (studentReflections.value) {
        const date = studentReflections.value.find(courseDate => courseDate.id === dateId.value)
        if (date) {
          const index = date.reflections.findIndex(reflection => reflection.id === reflectionId.value)
          if (index !== -1) {
            date.reflections[index] = reflectionInfo
            showSnackbar(SUCCESS_REFLECTION_UPDATE, true)
            closeDialog()
          }
        }
      }
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 404:
          showSnackbar(ERROR_REFLECTION_NOT_FOUND, false)
          break
        default:
          showSnackbar(ERROR_REFLECTION_UPDATE_FAILED, false)
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

onMounted(async () => {
  try {
    if (!authUser.value || !courseUuid.value) {
      showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
      return
    }

    if (studentReflections.value && studentFeedbacks.value) return

    const idToken = await authUser.value.getIdToken()
    studentReflections.value = await getStudentReflection(courseUuid.value, idToken)
    studentFeedbacks.value = await getStudentFeedbacks(courseUuid.value, idToken)
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
    <BaseLoading border-color="border-cyan-900" />
  </div>

  <div v-else>
    <div
      v-if="studentReflections && studentReflections.length > 0"
    >
      <!-- Chips表示 -->
      <div class="my-4 flex flex-wrap">
        <div
          v-for="(courseDate, i) in studentReflections"
          :key="i"
        >
          <BaseChip
            :data-testId="`chip-${i}`"
            :text="courseDate.course_number"
            :is-active="activeTabId === i"
            active-color="bg-cyan-600/10 text-cyan-900"
            @click-emit="setTab(i)"
          />
        </div>
      </div>

      <!-- チャット履歴 -->
      <div
        v-for="(courseDate, i) in studentReflections"
        :key="i"
      >
        <div v-if="activeTabId === i">
          <BaseCardReflection
            :data-testId="`reflection-${i}`"
            :title="`${courseDate.course_number}の振り返り`"
            :date="`授業日 ${courseDate.course_date}`"
          >
            <BaseCardFeedback :comment="check(courseDate)" />

            <div class="flex flex-col space-y-3">
              <div
                v-for="(reflection, j) in courseDate.reflections"
                :key="j"
                class="flex items-center justify-start"
              >
                <div
                  v-if="reflection.message_type === 'bot'"
                  :data-testId="`bot-${reflection.id}`"
                  class="flex items-start justify-start"
                >
                  <BaseCardAvatar bg-color="bg-cyan-600/10">
                    <Icon
                      name="fluent-mdl2:chat-bot"
                      size="24px"
                      style="color: #164e63"
                    />
                  </BaseCardAvatar>
                  <div class="max-w-95/100 break-all px-3 py-2">
                    {{ reflection.message }}
                  </div>
                </div>

                <div
                  v-else
                  :data-testId="`user-${reflection.id}`"
                  class="flex items-start justify-start"
                >
                  <BaseCardAvatar bg-color="bg-slate-600/10">
                    <Icon
                      name="mdi:user"
                      size="24px"
                      style="color: #475569"
                    />
                  </BaseCardAvatar>
                  <div class="max-w-95/100 break-all px-3 py-2">
                    {{ reflection.message }}
                  </div>
                  <BaseButton
                    :data-testId="`button-${reflection.id}`"
                    button-type="square"
                    @click="handleEditAction(courseDate, reflection)"
                  >
                    <Icon
                      name="mdi:lead-pencil"
                      size="20px"
                      style="color: #64748b"
                    />
                  </BaseButton>
                </div>
              </div>
            </div>
          </BaseCardReflection>
        </div>
      </div>

      <!-- 振り返り編集用ダイアログ -->
      <BaseDialogOverlay
        v-if="dialog"
        data-testId="editDialog"
      >
        <div class="flex w-full justify-center px-4">
          <BaseDialog
            ref="dialogRef"
            title="振り返りの編集"
            wide="large"
          >
            <BaseFormTextarea
              v-model.trim="message"
              data-testId="message"
              class="border-none px-3"
              textarea-placeholder="ここに振り返りを入力"
              default-height="44px"
            />
            <BaseErrorValidationMessage
              v-if="errors.message"
              :text="errors.message"
            />

            <template #footer>
              <BaseButton
                text="キャンセル"
                button-type="none"
                class="border border-slate-400 hover:bg-slate-100"
                @click="closeDialog"
              />

              <BaseButton
                data-testId="clickEdit"
                text="変更する"
                button-type="none"
                :is-clicked="isClick"
                class="bg-cyan-600 text-white hover:bg-cyan-600/75"
                @click="handleEditReflection"
              />
            </template>
          </BaseDialog>
        </div>
      </BaseDialogOverlay>
    </div>

    <div
      v-else
      class="mt-10"
    >
      <div class="flex flex-col items-center">
        <BaseEmpty
          img-path="s-empty-reflection_kx98n5.png"
          img-alt="振り返りはありません"
          explanation1="まだ振り返りはありません"
          explanation2="登録済みの振り返りがここに表示されます"
        />
      </div>
    </div>
  </div>
</template>
