<script setup lang="ts">
const chatContainer = ref<HTMLElement | null>(null)

const { authUser } = useAuth()
const { courseUuid } = useCourseApi()
const { todayCourseDate } = useCourseDateApi()
const { getStudentPrompt } = usePromptApi()
const { studentReflections, isTodayReflected, getStudentReflection, createReflection } = useReflectionApi()
const { studentFeedbacks, getStudentFeedbacks, createFeedback } = useFeedbackApi()
const {
  userInput,
  isUserInputEmpty,
  currentPrompts,
  chatHistory,
  isBotChatting,
  isChatEnded,
  resetChat,
  sendUserMessage,
  nextBotMessage,
  startChat,
  noChat,
  pendingChat,
  completeChat,
  checkUserInputStatus
} = useChat()
const { showSnackbar } = useSnackBar()
const { isActive, openToggle } = useToggle()
const { isActive: isExpanded, openToggle: toggleExpanded } = useToggle()

// 振り返り登録
const handleCreateReflection = async () => {
  if (authUser.value && courseUuid.value && todayCourseDate.value) {
    try {
      const idToken = await authUser.value.getIdToken()

      const chatHistoryData = chatHistory.value.map(({ message_type, message, message_time }) => ({

        message_type,
        message,

        message_time
      }))

      const reflectionInfo = await createReflection(
        courseUuid.value,
        todayCourseDate.value.id,
        chatHistoryData,
        idToken
      )
      if (studentReflections.value) {
        studentReflections.value.push(...reflectionInfo)
        isTodayReflected.value = true
        showSnackbar(SUCCESS_REFLECTION_CREATION, true)

        const format = chatHistory.value.map((chat) => {
          return `${chat.message_type}：${chat.message}`
        })

        try {
          const feedbackInfo = await createFeedback(courseUuid.value, todayCourseDate.value.id, format, idToken)
          studentFeedbacks.value?.push(feedbackInfo)
        }
        catch (error) {
          console.log(error)
        }
      }
    }
    catch {
      showSnackbar(ERROR_REFLECTION_CREATION_FAILED, false)
    }
  }
  else {
    showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
  }
}

const handleNextBotMessage = async () => await nextBotMessage(handleCreateReflection)

// 送信ボタン
const handleSendUserMessage = () => sendUserMessage(handleNextBotMessage)

const chatToggle = async () => {
  console.log('今日の変数', todayCourseDate.value)
  openToggle()
  if (!isActive.value) return

  resetChat()
  if (todayCourseDate.value?.is_reflection === true) {
    if (isTodayReflected.value === true) {
      await completeChat()
      return
    }

    if (currentPrompts.value.length > 0) {
      await startChat()
    }
    else {
      await pendingChat()
    }
  }
  else {
    await noChat()
  }
}

// 空文字チェック
watch(userInput, () => {
  checkUserInputStatus()
})

// 何か別の変数も監視の対象んする？
// チャット画面の高さを一番下にする
watch(
  chatHistory,
  async () => {
    if (chatContainer.value) {
      await nextTick()
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  },
  { deep: true }
)

// チャット画面を閉じた際に、デフォルトの画面サイズに戻しておく
watch(isActive, () => {
  if (isActive.value === false) {
    isExpanded.value = false
  }
})

onMounted(async () => {
  await nextTick()
  try {
    if (!authUser.value || !courseUuid.value) {
      showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
      return
    }

    if (studentReflections.value && studentFeedbacks.value) return

    const idToken = await authUser.value.getIdToken()
    // 今までの振り返りを取得
    // getStudentReflectionが何を返すかを確認
    studentReflections.value = await getStudentReflection(courseUuid.value, idToken)
    studentFeedbacks.value = await getStudentFeedbacks(courseUuid.value, idToken)
    console.log('フィードバック', studentFeedbacks.value)

    const today = new Date(Date.now()).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
    // const today = new Date().toLocaleDateString()
    // getReflectionDataから今日の日付を同じデータを探す、1つでも見つけた時点でその値が代入される
    isTodayReflected.value = !!studentReflections.value.find(date => date.course_date === today)

    // 今日の振り返りが未登録
    if (isTodayReflected.value === false) {
      const reflectionData = await getStudentPrompt(courseUuid.value, idToken)
      // プロンプトが用意されている場合はセット
      if (reflectionData && reflectionData.length > 0) {
        currentPrompts.value = reflectionData
      }
    }
  }
  catch {
    showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
  }
})
</script>

<template>
  <BaseButton
    v-if="!isActive"
    data-testId="botButton"
    button-type="circle"
    class="group bg-cyan-800 p-2"
    @click="chatToggle"
  >
    <Icon
      name="mdi:chat-processing-outline"
      size="30px"
      style="color: white"
    />
    <BaseTooltip
      class="top-14"
      message="振り返り"
    />
  </BaseButton>

  <!-- チャットが開いている状態 -->
  <div
    v-else
    data-testId="chatBot"
    class="fixed bottom-10"
    :class="isExpanded ? 'left-8 right-0 flex items-center justify-center sm:px-7' : 'right-8'"
  >
    <BaseChat
      title="振り返り"
      bg-color="bg-cyan-800"
      :is-expanded="isExpanded"
    >
      <template #icon>
        <div class="flex items-center justify-center space-x-1">
          <!-- 拡大縮小 -->
          <BaseButton
            button-type="icon"
            @click="toggleExpanded"
          >
            <Icon
              v-if="!isExpanded"
              name="mdi:arrow-expand"
              size="20px"
              style="color: white"
            />
            <Icon
              v-else
              name="mdi:arrow-collapse"
              size="20px"
              style="color: white"
            />
          </BaseButton>

          <!-- チャットが会話中のアイコン -->
          <BaseButton
            v-if="isBotChatting"
            button-type="icon"
          >
            <Icon
              name="eos-icons:bubble-loading"
              size="20px"
              style="color: white"
            />
          </BaseButton>

          <!-- userが入力ができる（操作できる）状態のアイコン -->
          <BaseButton
            v-else-if="!isBotChatting"
            button-type="icon"
            @click="chatToggle"
          >
            <Icon
              name="ic:baseline-close"
              size="20px"
              style="color: white"
            />
          </BaseButton>
        </div>
      </template>

      <!-- main -->
      <div
        ref="chatContainer"
        class="chat-scrollbar grow overflow-y-auto bg-white p-2"
      >
        <div class="mt-2 flex flex-col space-y-4">
          <div
            v-for="(message, i) in chatHistory"
            :key="i"
            class="mx-3 flex items-center"
            :class="message.message_type === 'bot' ? 'justify-start' : 'justify-end'"
          >
            <div v-if="message.isLoading">
              <BaseChatLoading
                bg-color="bg-slate-200"
                border-color="border-t-slate-200"
              />
            </div>

            <div v-else>
              <BaseChatBubble
                v-if="message.message_type === 'bot'"
                :data-testId="`botChat-${i}`"
                :message="message.message"
                message-type="bot"
                bg-color="bg-slate-200"
                border-color="border-t-slate-200"
                :max-width="isExpanded ? 'max-w-[70vw]' : 'max-w-[264px]'"
              />

              <BaseChatBubble
                v-else
                data-testId="userChat"
                :message="message.message"
                message-type="user"
                bg-color="bg-cyan-800"
                border-color="border-t-cyan-800"
                :max-width="isExpanded ? 'max-w-[70vw]' : 'max-w-[264px]'"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!isChatEnded"
        class="flex h-[60px] items-center rounded-b-sm border-t border-slate-200 bg-white p-2.5"
      >
        <!-- @keydown.shift.enter.preventでデフォルトの改行を阻止しつつ、関数の実行（改行されなくなる） -->
        <!-- ボタンが押せないよう状態でも、Shift + Enterで送信できてしまわないように注意 -->
        <BaseFormTextarea
          v-model.trim="userInput"
          data-testId="userInput"
          class="textarea-scrollbar mr-2 max-h-[50px] overflow-y-auto border-none bg-white"
          textarea-placeholder="ここに入力（Shift + Enterで送信）"
          default-height="44px"
          @keydown.shift.enter.prevent="handleSendUserMessage"
        />

        <!-- 送信できないようのボタン -->
        <button
          v-show="!isUserInputEmpty || isBotChatting"
          disabled
          class="flex items-center"
        >
          <Icon
            name="fluent:send-24-regular"
            size="24px"
            style="color: gray"
          />
        </button>

        <button
          v-show="isUserInputEmpty && !isBotChatting"
          data-testId="sendMessage"
          class="flex items-center"
          @click="handleSendUserMessage"
        >
          <Icon
            name="fluent:send-24-filled"
            size="24px"
            style="color: #155e75"
          />
        </button>
      </div>
    </BaseChat>
  </div>
</template>
