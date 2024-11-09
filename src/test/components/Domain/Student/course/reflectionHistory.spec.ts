// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import ReflectionHistory from '@/components/Domain/Student/course/ReflectionHistory.vue'
import { MOCK_AUTH_USER, MOCK_EMPTY_UUID, MOCK_UUID, wait } from '@/test/mocks/index'
import { registerReflectionEndpoints } from '@/test/mocks/reflection/endpoints'
import { registerFeedbackEndpoints } from '@/test/mocks/feedback/endpoints'

mockComponent('BaseButton', {
  template: '<button>stub button</button>'
})

mockComponent('BaseEmpty', {
  template: '<div data-testId="empty">stub empty reflection</div>'
})

mockComponent('BaseCardFeedback', {
  template: '<div>stub feedback</div>'
})

describe('ReflectionHistoryコンポーネントのテスト', () => {
  let auth: AuthReturnType
  let course: CourseApiReturnType
  let reflection: ReflectionApiReturnType
  let feedback: FeedbackApiReturnType
  registerReflectionEndpoints()
  registerFeedbackEndpoints()

  beforeEach(() => {
    auth = useAuth()
    course = useCourseApi()
    reflection = useReflectionApi()
    feedback = useFeedbackApi()
  })

  afterEach(() => {
    auth.authUser.value = null
    reflection.studentReflections.value = null
    feedback.studentFeedbacks.value = null
  })

  describe('振り返りが存在しない場合', () => {
    it('振り返りがないことを示すコンポーネントが表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_EMPTY_UUID
      const wrapper = await mountSuspended(ReflectionHistory)

      await wait(100)

      expect(wrapper.find(`[data-testId="empty"]`).exists()).toBe(true)
    })
  })

  describe('振り返りが存在する場合', () => {
    it('振り返り済みの授業回がChipsに表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(ReflectionHistory)

      await wait(100)

      if (reflection.studentReflections.value) {
        for (let i = 0; i < reflection.studentReflections.value.length; i++) {
          const chip = wrapper.find(`[data-testId="chip-${i}"]`).text()
          expect(chip).toBe(reflection.studentReflections.value[i].course_number)
        }
      }
    })

    it('初期表示は最初の振り返り履歴が表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(ReflectionHistory)

      await wait(100)

      const reflectionCard = wrapper.find(`[data-testId="reflection-0"]`).text()

      expect(reflection.studentReflections.value).toBeTruthy()

      if (!reflection.studentReflections.value) return

      expect(reflectionCard).toContain(reflection.studentReflections.value[0].course_date)
      expect(reflectionCard).toContain(reflection.studentReflections.value[0].course_number)

      reflection.studentReflections.value[0].reflections.forEach((reflection) => {
        if (reflection.message_type === 'bot') {
          expect(wrapper.find(`[data-testId="bot-${reflection.id}"]`).text()).toContain(reflection.message)
        }
        else if (reflection.message_type === 'user') {
          expect(wrapper.find(`[data-testId="user-${reflection.id}"]`).text()).toContain(reflection.message)
        }
      })
    })

    it('選択した授業回の振り返り履歴が表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(ReflectionHistory)

      await wait(200)
      await wrapper.find(`[data-testId="chip-1"]`).trigger('click')

      const reflectionCard = wrapper.find(`[data-testId="reflection-1"]`).text()

      expect(reflection.studentReflections.value).toBeTruthy()

      if (!reflection.studentReflections.value) return

      expect(reflectionCard).toContain(reflection.studentReflections.value[1].course_date)
      expect(reflectionCard).toContain(reflection.studentReflections.value[1].course_number)

      reflection.studentReflections.value[1].reflections.forEach((reflection) => {
        if (reflection.message_type === 'bot') {
          expect(wrapper.find(`[data-testId="bot-${reflection.id}"]`).text()).toContain(reflection.message)
        }
        else if (reflection.message_type === 'user') {
          expect(wrapper.find(`[data-testId="user-${reflection.id}"]`).text()).toContain(reflection.message)
        }
      })
    })

    it('編集用ダイアログが表示され、振り返りの編集ができる', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(ReflectionHistory)

      await wait(100)

      expect(reflection.studentReflections.value).toBeTruthy()

      if (!reflection.studentReflections.value) return

      expect(wrapper.find(`[data-testId="editDialog"]`).exists()).toBe(false)

      await wrapper.find(`[data-testId="button-4"]`).trigger('click')

      expect(wrapper.find(`[data-testId="editDialog"]`).exists()).toBe(true)

      await wrapper.find(`[data-testId="message"]`).setValue('テストメッセージ')
      await wrapper.find(`[data-testId="clickEdit"]`).trigger('click')
      await wait(100)

      expect(reflection.studentReflections.value[0].reflections[3].message).toBe('テストメッセージ')
    })
  })
})
