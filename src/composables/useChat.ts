export const useChat = () => {
  // user
  const userInput = ref('')
  const isUserInputEmpty = ref(false)
  // bot
  const currentPrompts = useState<string[]>('currentPrompts', () => [])
  // const currentPrompts = ref<string[]>([]) // 現在チャットに表示中のプロンプト
  const activePrompts = ref<string[]>([]) // activeなプロンプト（チャット画面を表示中にactiveなプロンプトを変更する際の対策）
  const currentPromptIndex = ref(-1) // プロンプトがどこまで進んだか
  const isBotChatting = ref(false) // 現在botが応答中かどうか（何枚もボタンを押せない、送信ボタンを押せない用）
  const isChatEnded = ref(false) // 全ての会話が終了したか
  // other
  const chatHistory = ref<ChatMessage[]>([]) // userとbotの会話履歴
  const startTime = ref<number>(0)
  const endTime = ref<number>(0)
  const reflectionTimeInSeconds = ref<number>()

  const resetChat = () => {
    userInput.value = ''
    isUserInputEmpty.value = false
    currentPromptIndex.value = -1
    isBotChatting.value = false
    isChatEnded.value = false
    chatHistory.value = []
  }

  // 教員ページで使う場合は、nextBotMessage関数をそのまま引数に渡す
  // 学生ページで使う場合は、nextBotMessage関数に引数を渡した関数を渡す（拡張する）
  const sendUserMessage = async (handleBotMessage: () => Promise<void>) => {
    if (!isBotChatting.value && userInput.value.trim() !== '') {
      // 計測終了
      endTime.value = performance.now()
      const timeDifference = endTime.value - startTime.value
      reflectionTimeInSeconds.value = Number((timeDifference / 1000).toFixed(2))

      const userMessage: ChatMessage = {
        message_type: 'user',
        message: userInput.value,
        message_time: reflectionTimeInSeconds.value,
        isLoading: false
      }

      chatHistory.value.push(userMessage)
      userInput.value = ''

      await handleBotMessage()
    }
  }

  //   教員ページで使う際は引数なし、学生ページで使う場合は引数あり
  const nextBotMessage = async (saveChatHistory?: () => void) => {
    isBotChatting.value = true // ボタンを押せいないようにする
    if (currentPromptIndex.value < currentPrompts.value.length - 1) {
      currentPromptIndex.value++
      // loading用オブジェクトを作成
      const botMessage: ChatMessage = {
        message_type: 'bot',
        message: '',
        message_time: 0,
        isLoading: true
      }
      chatHistory.value.push(botMessage)

      if (process.env.NODE_ENV !== 'test') {
        await new Promise(resolve => setTimeout(resolve, 3000))
      }

      const index = chatHistory.value.findIndex(message => message.isLoading === true)
      if (index !== -1) {
        // 先ほど作成したloading用オブジェクトをmessage用オブジェクトに上書き
        chatHistory.value[index] = {
          message_type: 'bot',
          message: currentPrompts.value[currentPromptIndex.value],
          message_time: 0,
          isLoading: false
        }
      }
      // 計測開始
      startTime.value = performance.now()
    }
    else {
      // プロンプト終了
      const botMessage: ChatMessage = {
        message_type: 'bot',
        message: '',
        message_time: 0,
        isLoading: true
      }
      chatHistory.value.push(botMessage)

      if (process.env.NODE_ENV !== 'test') {
        await new Promise(resolve => setTimeout(resolve, 3000))
      }

      const index = chatHistory.value.findIndex(message => message.isLoading === true)
      if (index !== -1) {
        // 先ほど作成したloading用オブジェクトをmessage用オブジェクトに上書き
        chatHistory.value[index] = { message_type: 'bot', message: endChatMessage, message_time: 0, isLoading: false }
      }
      if (saveChatHistory) {
        saveChatHistory()
      }
      //   全ての会話が終了
      isChatEnded.value = true
    }
    isBotChatting.value = false // botの会話が終わったのでボタンを押してもいいようにする
  }

  const startChat = async () => {
    isBotChatting.value = true // 会話始め
    // activeなプロンプトに変更があった際
    if (activePrompts.value.length !== 0) {
      currentPrompts.value = []
      currentPrompts.value.push(...activePrompts.value)
    }
    for (let i = 0; i < startChatMessage.length; i++) {
      const currentMessage = startChatMessage[i]
      const botMessage: ChatMessage = {
        message_type: 'bot',
        message: currentMessage,
        message_time: 0,
        isLoading: true
      }
      chatHistory.value.push(botMessage)
      if (process.env.NODE_ENV !== 'test') {
        await new Promise(resolve => setTimeout(resolve, 3000))
      }

      chatHistory.value[i].isLoading = false
    }
    isBotChatting.value = false // 会話終了
    await nextBotMessage()
  }

  const noChat = async () => {
    isChatEnded.value = true // ユーザーの入力はない
    isBotChatting.value = true
    for (let i = 0; i < noChatMessage.length; i++) {
      const currentMessage = noChatMessage[i]
      const botMessage: ChatMessage = {
        message_type: 'bot',
        message: currentMessage,
        message_time: 0,
        isLoading: true
      }
      chatHistory.value.push(botMessage)
      if (process.env.NODE_ENV !== 'test') {
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
      chatHistory.value[i].isLoading = false
    }
    isBotChatting.value = false // 会話終了
  }

  // プロンプトが存在しない
  const pendingChat = async () => {
    isChatEnded.value = true // ユーザーの入力はない
    isBotChatting.value = true
    for (let i = 0; i < pendingChatMessage.length; i++) {
      const currentMessage = pendingChatMessage[i]
      const botMessage: ChatMessage = {
        message_type: 'bot',
        message: currentMessage,
        message_time: 0,
        isLoading: true
      }
      chatHistory.value.push(botMessage)
      if (process.env.NODE_ENV !== 'test') {
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
      chatHistory.value[i].isLoading = false
    }
    isBotChatting.value = false // 会話終了
  }

  // 振り返り登録済み
  const completeChat = async () => {
    isChatEnded.value = true // ユーザーの入力はない
    isBotChatting.value = true
    for (let i = 0; i < completeChatMessage.length; i++) {
      const currentMessage = completeChatMessage[i]
      const botMessage: ChatMessage = {
        message_type: 'bot',
        message: currentMessage,
        message_time: 0,
        isLoading: true
      }
      chatHistory.value.push(botMessage)
      if (process.env.NODE_ENV !== 'test') {
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
      chatHistory.value[i].isLoading = false
    }
    isBotChatting.value = false // 会話終了
  }

  const checkUserInputStatus = () => {
    isUserInputEmpty.value = userInput.value.trim() !== ''
  }

  return {
    userInput,
    isUserInputEmpty,
    activePrompts,
    currentPrompts,
    chatHistory,
    startTime,
    isBotChatting,
    isChatEnded,
    resetChat,
    sendUserMessage,
    nextBotMessage,
    startChat,
    noChat,
    pendingChat,
    completeChat,
    checkUserInputStatus,
    currentPromptIndex
  }
}
