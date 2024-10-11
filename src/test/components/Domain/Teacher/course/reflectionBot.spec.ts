// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import ReflectionBot from '@/components/Domain/Teacher/course/ReflectionBot.vue'
import { mockPromptsData } from '@/test/mocks/prompt/index'

mockComponent('BaseButton', {
  template: '<button>stub button</button>'
})

describe('ReflectionBotコンポーネントのテスト', () => {
  let prompt: PromptApiReturnType

  beforeEach(() => {
    prompt = usePromptApi()
  })

  afterEach(() => {
    prompt.activePrompt.value = null
  })

  describe('チャットボットの開閉状態のテスト', () => {
    it('初期状態では、チャットボットは非表示である', async () => {
      const wrapper = await mountSuspended(ReflectionBot)

      expect(wrapper.find(`[data-testId="chatBot"]`).exists()).toBe(false)
    })

    it('チャットアイコンをクリックすると、チャットボットが表示される', async () => {
      const wrapper = await mountSuspended(ReflectionBot)

      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      expect(wrapper.find(`[data-testId="chatBot"]`).exists()).toBe(true)
    })
  })

  describe('送信ボタンの表示状態', () => {
    it('ボタンが非活性のときは表示されない', async () => {
      prompt.activePrompt.value = mockPromptsData[0]
      const wrapper = await mountSuspended(ReflectionBot)

      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      const button = wrapper.find(`[data-testId="sendMessage"]`)

      expect((button.element as HTMLElement).style.display).toBe('none')
    })

    it('テキスト入力後、ボタンが活性化し表示される', async () => {
      prompt.activePrompt.value = mockPromptsData[0]
      const wrapper = await mountSuspended(ReflectionBot)

      await wrapper.find(`[data-testId="botButton"]`).trigger('click')
      await wrapper.find(`[data-testId="userInput"]`).setValue('テストメッセージ')

      const button = wrapper.find(`[data-testId="sendMessage"]`)

      expect((button.element as HTMLElement).style.display).not.toBe('none')
    })
  })

  describe('メッセージ送信', () => {
    it('テキスト入力後、送信ボタンをクリックしてメッセージを送信できる', async () => {
      prompt.activePrompt.value = mockPromptsData[0]
      const wrapper = await mountSuspended(ReflectionBot)

      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      expect(wrapper.find(`[data-testId="userChat"]`).exists()).toBe(false)

      await wrapper.find(`[data-testId="userInput"]`).setValue('テストメッセージ')
      await wrapper.find(`[data-testId="sendMessage"]`).trigger('click')

      expect(wrapper.find(`[data-testId="userChat"]`).exists()).toBe(true)
    })

    it('テキスト入力後、Shift+Enterキー操作でメッセージを送信できる', async () => {
      prompt.activePrompt.value = mockPromptsData[0]
      const wrapper = await mountSuspended(ReflectionBot)

      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      expect(wrapper.find(`[data-testId="userChat"]`).exists()).toBe(false)

      await wrapper.find(`[data-testId="userInput"]`).setValue('テストメッセージ')
      await wrapper.find(`[data-testId="userInput"]`).trigger('keydown.shift.enter')

      expect(wrapper.find(`[data-testId="userChat"]`).exists()).toBe(true)
    })

    it('チャット終了後に入力フィールドが非表示になる', async () => {
      prompt.activePrompt.value = mockPromptsData[0]
      const wrapper = await mountSuspended(ReflectionBot)

      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      await wrapper.find(`[data-testId="userInput"]`).setValue('テストメッセージ')
      await wrapper.find(`[data-testId="sendMessage"]`).trigger('click')

      await wrapper.find(`[data-testId="userInput"]`).setValue('テストメッセージ')
      await wrapper.find(`[data-testId="sendMessage"]`).trigger('click')

      expect(wrapper.find(`[data-testId="chatInput"]`).exists()).toBe(false)
    })
  })
})
