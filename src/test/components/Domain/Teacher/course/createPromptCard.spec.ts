// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import CreatePromptCard from '@/components/Domain/Teacher/course/CreatePromptCard.vue'
import { mockAuthUser, dataUUID, wait } from '@/test/mocks/index'
import { registerPromptEndpoints } from '@/test/mocks/prompt/endpoints'

mockComponent('BaseButton', {
  template: '<button>stub button</button>'
})

describe('CreatePromptCardコンポーネントのテスト', () => {
  let auth: AuthReturnType
  let course: CourseApiReturnType
  let prompt: PromptApiReturnType
  registerPromptEndpoints()

  beforeEach(() => {
    auth = useAuth()
    course = useCourseApi()
    prompt = usePromptApi()
  })

  afterEach(() => {
    auth.authUser.value = null
    prompt.prompts.value = null
  })

  it('ダイアログがクリックで正しく開閉する', async () => {
    const wrapper = await mountSuspended(CreatePromptCard)

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)

    await wrapper.get(`[data-testId="button"]`).trigger('click')

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(true)

    await wrapper.find(`[data-testId="clickCancel"]`).trigger('click')

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)
  })

  describe('入力フォーム数のテスト', () => {
    it('初期状態では、入力フォームが1つ存在する', async () => {
      const wrapper = await mountSuspended(CreatePromptCard)

      await wrapper.get(`[data-testId="button"]`).trigger('click')

      expect(wrapper.find(`[data-testId="content"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="extraContent-0"]`).exists()).toBe(false)
    })

    it('追加ボタンを押した後、入力フォームが1つ増える', async () => {
      const wrapper = await mountSuspended(CreatePromptCard)

      await wrapper.get(`[data-testId="button"]`).trigger('click')
      await wrapper.find(`[data-testId="addButton"]`).trigger('click')

      expect(wrapper.find(`[data-testId="extraContent-0"]`).exists()).toBe(true)
    })

    it('入力フォームが1つ増えた状態で削除ボタンを押すと、該当の入力フォームが消える', async () => {
      const wrapper = await mountSuspended(CreatePromptCard)

      await wrapper.get(`[data-testId="button"]`).trigger('click')
      await wrapper.find(`[data-testId="addButton"]`).trigger('click')
      await wrapper.find(`[data-testId="removeButton-0"]`).trigger('click')

      expect(wrapper.find(`[data-testId="extraContent-0"]`).exists()).toBe(false)
    })
  })

  describe('バリデーション', () => {
    it('全ての入力フィールドが値が空の場合、エラーメッセージが表示される', async () => {
      const wrapper = await mountSuspended(CreatePromptCard)
      await wrapper.get(`[data-testId="button"]`).trigger('click')

      await wrapper.find(`[data-testId="clickCreate"]`).trigger('click')
      await wait(300)

      expect(wrapper.find(`[data-testId="errorTitle"]`).text()).toBe('必須項目です')
      expect(wrapper.find(`[data-testId="errorContent"]`).text()).toBe('必須項目です')
    })

    it('全ての入力フィールドに有効な値が入力されている場合、エラーメッセージが表示されず、プロンプトを作成できる', async () => {
      auth.authUser.value = mockAuthUser
      course.courseUuid.value = dataUUID
      prompt.prompts.value = []
      const wrapper = await mountSuspended(CreatePromptCard)

      await wrapper.get(`[data-testId="button"]`).trigger('click')

      await wrapper.find(`[data-testId="title"]`).setValue('第1回目の振り返り')
      await wrapper
        .find(`[data-testId="content"]`)
        .setValue('今日学んだ内容について、自分が理解できた点とまだ理解できていない点は何ですか？')

      await wrapper.find(`[data-testId="addButton"]`).trigger('click')
      await wrapper
        .find(`[data-testId="extraContent-0"]`)
        .setValue(
          '今日の授業で扱った数学の概念や公式を、日常生活や他の科目と関連付けることができますか？具体的な例を挙げて説明してください。'
        )

      await wrapper.find(`[data-testId="clickCreate"]`).trigger('click')
      await wait(300)

      expect(wrapper.find(`[data-testId="errorTitle"]`).exists()).toBe(false)
      expect(wrapper.find(`[data-testId="errorContent"]`).exists()).toBe(false)
      expect(prompt.prompts.value.length).toBe(1)
      expect(prompt.prompts.value[0].prompt_questions.length).toBe(2)
    })
  })
})
