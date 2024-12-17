// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import ShowPromptCard from '@/components/Domain/Teacher/course/ShowPromptCard.vue'
import { MOCK_TEACHER_AUTH_USER, MOCK_EMPTY_UUID, MOCK_UUID, wait } from '@/test/mocks/index'
import { registerPromptEndpoints } from '@/test/mocks/prompt/endpoints'

mockComponent('BaseEmpty', {
  template: '<div data-testId="empty">stub empty prompt</div>'
})

mockComponent('Icon', {
  template: '<div>stub icon</div>'
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    handlePromptMultipleActions: (actionId: number, prompt: Prompt) => void
  }
}

describe('ShowPromptCardコンポーネントのテスト', () => {
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
    prompt.activePrompt.value = null
  })

  describe('プロンプトが存在しない場合', () => {
    it('プロンプトがないことを示すコンポーネントが表示される', async () => {
      auth.authUser.value = MOCK_TEACHER_AUTH_USER
      course.courseUuid.value = MOCK_EMPTY_UUID
      const wrapper = await mountSuspended(ShowPromptCard)

      await wait(10)

      expect(wrapper.find(`[data-testId="empty"]`).exists()).toBe(true)
    })
  })

  describe('プロンプトが存在する場合', () => {
    it('プロンプトカードが表示される', async () => {
      auth.authUser.value = MOCK_TEACHER_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(ShowPromptCard)

      await wait(10)

      expect(prompt.prompts.value).toBeTruthy()

      if (!prompt.prompts.value) return

      for (let i = 0; i < prompt.prompts.value.length; i++) {
        const promptCard = wrapper.find(`[data-testId="prompt-${i}"]`).text()

        expect(promptCard).toContain(prompt.prompts.value[i].title)

        if (prompt.prompts.value[i].active === true) {
          expect(wrapper.find(`[data-testId="badge-${i}"]`).exists()).toBe(true)
        }
        else {
          expect(wrapper.find(`[data-testId="badge-${i}"]`).exists()).toBe(false)
        }

        for (let j = 0; j < prompt.prompts.value[i].prompt_questions.length; j++) {
          expect(promptCard).toContain(prompt.prompts.value[i].prompt_questions[j].content)
        }
      }
    })

    describe('編集用ダイアログ', () => {
      it('選択したプロンプトから、問いかけを1つ減らして編集する', async () => {
        auth.authUser.value = MOCK_TEACHER_AUTH_USER
        course.courseUuid.value = MOCK_UUID
        const wrapper = await mountSuspended(ShowPromptCard)

        await wait(10)

        expect(prompt.prompts.value).toBeTruthy()

        if (!prompt.prompts.value) return

        wrapper.vm.handlePromptMultipleActions(1, prompt.prompts.value[0])

        await wrapper.vm.$nextTick()

        expect(wrapper.find(`[data-testId="editDialog"]`).exists()).toBe(true)

        await wrapper.find(`[data-testId="removeButton-0"]`).trigger('click')
        await wrapper.find(`[data-testId="clickEdit"]`).trigger('click')
        await wait(100)

        expect(prompt.prompts.value[0].prompt_questions.length).toBe(1)
      })

      it('選択したプロンプトに、問いかけを1つ増やして編集する', async () => {
        auth.authUser.value = MOCK_TEACHER_AUTH_USER
        course.courseUuid.value = MOCK_UUID
        const wrapper = await mountSuspended(ShowPromptCard)

        await wait(10)

        expect(prompt.prompts.value).toBeTruthy()

        if (!prompt.prompts.value) return

        wrapper.vm.handlePromptMultipleActions(1, prompt.prompts.value[0])

        await wrapper.vm.$nextTick()

        expect(wrapper.find(`[data-testId="editDialog"]`).exists()).toBe(true)

        await wrapper.find(`[data-testId="addButton"]`).trigger('click')
        await wrapper.find(`[data-testId="extraContent-1"]`).setValue('その他、授業に関する質問等はありますか？')

        await wrapper.find(`[data-testId="clickEdit"]`).trigger('click')
        await wait(100)

        expect(prompt.prompts.value[0].prompt_questions.length).toBe(3)
      })
    })

    it('有効化用ダイアログが表示され、プロンプトの有効化ができる', async () => {
      auth.authUser.value = MOCK_TEACHER_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(ShowPromptCard)

      await wait(10)

      expect(prompt.prompts.value).toBeTruthy()

      if (!prompt.prompts.value) return

      wrapper.vm.handlePromptMultipleActions(2, prompt.prompts.value[1])

      await wrapper.vm.$nextTick()

      expect(wrapper.find(`[data-testId="statusDialog"]`).exists()).toBe(true)

      await wrapper.find(`[data-testId="clickEnable"]`).trigger('click')
      await wait(100)

      expect(prompt.prompts.value[1].active).toBe(true)
      expect(prompt.activePrompt.value?.id).toBe(2)
    })

    it('削除用ダイアログが表示され、アクティブなプロンプトを削除した場合、有効化されているプロンプトはなくなる', async () => {
      auth.authUser.value = MOCK_TEACHER_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(ShowPromptCard)

      await wait(10)

      expect(prompt.prompts.value).toBeTruthy()

      if (!prompt.prompts.value) return

      wrapper.vm.handlePromptMultipleActions(3, prompt.prompts.value[0])

      await wrapper.vm.$nextTick()

      expect(wrapper.find(`[data-testId="deleteDialog"]`).exists()).toBe(true)

      await wrapper.find(`[data-testId="clickDelete"]`).trigger('click')
      await wait(100)

      expect(prompt.prompts.value.length).toBe(4)
      expect(prompt.activePrompt.value).toBe(null)
    })
  })
})
