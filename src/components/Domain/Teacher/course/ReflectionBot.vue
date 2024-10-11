<script setup lang="ts">
const chatContainer = ref<HTMLElement | null>(null)

const { activePrompt } = usePromptApi()
const {
  userInput,
  isUserInputEmpty,
  activePrompts,
  currentPrompts,
  chatHistory,
  isBotChatting,
  isChatEnded,
  resetChat,
  sendUserMessage,
  nextBotMessage,
  startChat,
  checkUserInputStatus
} = useChat()
const { isActive, openToggle } = useToggle()

const chatToggle = async () => {
  openToggle()
  if (isActive.value === true) {
    resetChat()
    await startChat()
  }
}

const handleSendUserMessage = () => {
  sendUserMessage(nextBotMessage)
}

// 空文字チェック
watch(userInput, () => {
  checkUserInputStatus()
})

// チャットを開いている最中にactiveを更新したとき
watch(activePrompt, () => {
  if (activePrompt.value) {
    const newPrompts = activePrompt.value.prompt_questions.map(prompt => prompt.content)
    activePrompts.value = []
    activePrompts.value.push(...newPrompts)
  }
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

// 振り返りタブを開いたとき
onMounted(() => {
  if (activePrompt.value) {
    // const mountPrompts = activePrompt.value.prompt_contents.map((prompt) => prompt.content)
    const mountPrompts = activePrompt.value.prompt_questions.map(prompt => prompt.content)
    currentPrompts.value = []
    currentPrompts.value.push(...mountPrompts)
  }
})
</script>

<template>
  <BaseButton
    v-if="!isActive"
    data-testId="botButton"
    button-type="circle"
    class="group bg-[#104c94] p-2"
    @click="chatToggle"
  >
    <Icon
      name="mdi:chat-processing-outline"
      size="30px"
      style="color: white"
    />
    <BaseTooltip
      class="top-14"
      message="振り返りデモ"
    />
  </BaseButton>

  <!-- ボタンを開けている状態 -->
  <div
    v-else
    data-testId="chatBot"
  >
    <!-- チャットが会話中のアイコン -->
    <BaseButton
      v-if="isBotChatting"
      button-type="circle"
      class="group bg-[#104c94] p-2"
    >
      <Icon
        name="eos-icons:bubble-loading"
        size="30px"
        style="color: white"
      />
      <BaseTooltip
        class="top-14"
        message="読み込み中"
      />
    </BaseButton>

    <!-- userが入力ができる（操作できる）状態のアイコン -->
    <BaseButton
      v-else-if="!isBotChatting"
      button-type="circle"
      class="group bg-red-600 p-2"
      @click="chatToggle"
    >
      <Icon
        name="ic:baseline-close"
        size="30px"
        style="color: white"
      />
      <BaseTooltip
        class="top-14"
        message="閉じる"
      />
    </BaseButton>

    <!-- 表示位置 -->
    <div class="fixed bottom-28 right-8">
      <BaseChat
        title="振り返りプレビュー"
        bg-color="bg-[#104c94]"
      >
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
                  :message="message.message"
                  message-type="bot"
                  bg-color="bg-slate-200"
                  border-color="border-t-slate-200"
                />

                <BaseChatBubble
                  v-else
                  data-testId="userChat"
                  :message="message.message"
                  message-type="user"
                  bg-color="bg-[#104c94]"
                  border-color="border-t-[#104c94]"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="!isChatEnded"
          data-testId="chatInput"
          class="flex h-[60px] items-center rounded-b-sm border-t border-slate-200 bg-white p-2.5"
        >
          <!-- @keydown.shift.enter.preventでデフォルトの改行を阻止しつつ、関数の実行（改行されなくなる） -->
          <!-- ボタンが押せないよう状態でも、Shift + Enterで送信できてしまわないように注意 -->
          <BaseFormTextarea
            v-model="userInput"
            data-testId="userInput"
            class="textarea-scrollbar mr-2 max-h-[50px] overflow-y-auto border-none bg-white"
            textarea-placeholder="ここに入力（Shift + Enterで送信）"
            default-height="44px"
            @keydown.shift.enter.prevent="handleSendUserMessage"
          />

          <!-- 送信できないようのボタン -->
          <button
            v-show="!isUserInputEmpty || isBotChatting"
            data-testId="sendMessageDisabled"
            disabled
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
            @click="handleSendUserMessage"
          >
            <Icon
              name="fluent:send-24-filled"
              size="24px"
              style="color: #104c94"
            />
          </button>
        </div>
      </BaseChat>
    </div>
  </div>
</template>
