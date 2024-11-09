// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import ReflectionBot from '@/components/Domain/Student/course/ReflectionBot.vue'
import { MOCK_AUTH_USER, MOCK_EMPTY_UUID, MOCK_UUID, wait } from '@/test/mocks/index'
import { registerReflectionEndpoints } from '@/test/mocks/reflection/endpoints'
import { registerPromptEndpoints } from '@/test/mocks/prompt/endpoints'
import { registerFeedbackEndpoints } from '@/test/mocks/feedback/endpoints'
import { MOCK_COURSE_DATES } from '@/test/mocks/courseDate/index'

mockComponent('BaseButton', {
  template: '<button>stub button</button>'
})

describe('ReflectionBotコンポーネントのテスト', () => {
  let auth: AuthReturnType
  let course: CourseApiReturnType
  let reflection: ReflectionApiReturnType
  let feedback: FeedbackApiReturnType
  let courseDate: CourseDateApiReturnType
  let chat: ChatReturnType
  registerReflectionEndpoints()
  registerPromptEndpoints()
  registerFeedbackEndpoints()

  beforeEach(() => {
    auth = useAuth()
    course = useCourseApi()
    reflection = useReflectionApi()
    feedback = useFeedbackApi()
    courseDate = useCourseDateApi()
    chat = useChat()
    const mockDate = new Date(2024, 3, 15)
    mockDate.setHours(0, 0, 0, 0)
    vi.spyOn(Date, 'now').mockImplementation(() => mockDate.getTime())
  })

  afterEach(() => {
    auth.authUser.value = null
    reflection.studentReflections.value = null
    reflection.isTodayReflected.value = null
    feedback.studentFeedbacks.value = null
    courseDate.todayCourseDate.value = null
    chat.currentPrompts.value = []
    vi.restoreAllMocks()
  })

  describe('チャットボットの開閉状態のテスト', () => {
    it('初期状態では、チャットボットは非表示である', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(ReflectionBot)

      await wait(50)

      expect(wrapper.find(`[data-testId="chatBot"]`).exists()).toBe(false)
    })

    it('チャットアイコンをクリックすると、チャットボットが表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(ReflectionBot)

      await wait(50)
      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      expect(wrapper.find(`[data-testId="chatBot"]`).exists()).toBe(true)
    })
  })

  describe('チャット開始のシナリオ', () => {
    it('教員からの振り返りがまだ公開されていない場合のチャット', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_EMPTY_UUID
      courseDate.todayCourseDate.value = MOCK_COURSE_DATES[0]
      const wrapper = await mountSuspended(ReflectionBot)

      await wait(50)
      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      for (let i = 0; i < PENDING_CHAT_MESSAGES.length; i++) {
        expect(wrapper.find(`[data-testId="botChat-${i}"]`).text()).toBe(PENDING_CHAT_MESSAGES[i])
      }
    })

    it('その日の授業で振り返りが存在しない場合のチャット', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_EMPTY_UUID
      courseDate.todayCourseDate.value = MOCK_COURSE_DATES[1]
      const wrapper = await mountSuspended(ReflectionBot)

      await wait(50)
      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      for (let i = 0; i < NO_CHAT_MESSAGES.length; i++) {
        expect(wrapper.find(`[data-testId="botChat-${i}"]`).text()).toBe(NO_CHAT_MESSAGES[i])
      }
    })

    it('その日の振り返りがまだ未実施の場合のチャット', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      courseDate.todayCourseDate.value = MOCK_COURSE_DATES[0]
      const wrapper = await mountSuspended(ReflectionBot)

      await wait(50)
      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      for (let i = 0; i < START_CHAT_MESSAGES.length; i++) {
        expect(wrapper.find(`[data-testId="botChat-${i}"]`).text()).toBe(START_CHAT_MESSAGES[i])
      }
    })

    it('その日の振り返りが既に実施済みの場合のチャット', async () => {
      const mockDate = new Date(2024, 3, 8)
      mockDate.setHours(0, 0, 0, 0)
      vi.spyOn(Date, 'now').mockImplementation(() => mockDate.getTime())
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      courseDate.todayCourseDate.value = MOCK_COURSE_DATES[0]
      const wrapper = await mountSuspended(ReflectionBot)

      await wait(50)
      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      for (let i = 0; i < COMPLETE_CHAT_MESSAGES.length; i++) {
        expect(wrapper.find(`[data-testId="botChat-${i}"]`).text()).toBe(COMPLETE_CHAT_MESSAGES[i])
      }
    })
  })

  describe('送信ボタンの表示状態', () => {
    it('ボタンが非活性のときは表示されない', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      courseDate.todayCourseDate.value = MOCK_COURSE_DATES[0]
      const wrapper = await mountSuspended(ReflectionBot)

      await wait(50)
      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      const button = wrapper.find(`[data-testId="sendMessage"]`)

      expect((button.element as HTMLElement).style.display).toBe('none')
    })

    it('テキスト入力後、ボタンが活性化し表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      courseDate.todayCourseDate.value = MOCK_COURSE_DATES[0]
      const wrapper = await mountSuspended(ReflectionBot)

      await wait(50)
      await wrapper.find(`[data-testId="botButton"]`).trigger('click')
      await wrapper.find(`[data-testId="userInput"]`).setValue('テストメッセージ')

      const button = wrapper.find(`[data-testId="sendMessage"]`)

      expect((button.element as HTMLElement).style.display).not.toBe('none')
    })
  })

  describe('メッセージ送信', () => {
    it('テキスト入力後、送信ボタンをクリックしてメッセージを送信できる', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      courseDate.todayCourseDate.value = MOCK_COURSE_DATES[0]
      const wrapper = await mountSuspended(ReflectionBot)

      await wait(50)
      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      expect(wrapper.find(`[data-testId="userChat"]`).exists()).toBe(false)

      await wrapper.find(`[data-testId="userInput"]`).setValue('テストメッセージ')
      await wrapper.find(`[data-testId="sendMessage"]`).trigger('click')

      expect(wrapper.find(`[data-testId="userChat"]`).exists()).toBe(true)
    })

    it('テキスト入力後、Shift+Enterキー操作でメッセージを送信できる', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      courseDate.todayCourseDate.value = MOCK_COURSE_DATES[0]
      const wrapper = await mountSuspended(ReflectionBot)

      await wait(50)
      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      expect(wrapper.find(`[data-testId="userChat"]`).exists()).toBe(false)

      await wrapper.find(`[data-testId="userInput"]`).setValue('テストメッセージ')
      await wrapper.find(`[data-testId="userInput"]`).trigger('keydown.shift.enter')

      expect(wrapper.find(`[data-testId="userChat"]`).exists()).toBe(true)
    })

    it('チャット終了後、振り返りを作成し、入力フィールドが非表示になる', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      courseDate.todayCourseDate.value = MOCK_COURSE_DATES[2]
      const wrapper = await mountSuspended(ReflectionBot)

      await wait(50)

      expect(reflection.studentReflections.value?.length).toBe(2)

      await wrapper.find(`[data-testId="botButton"]`).trigger('click')

      await wrapper.find(`[data-testId="userInput"]`).setValue('テストメッセージ')
      await wrapper.find(`[data-testId="sendMessage"]`).trigger('click')

      await wrapper.find(`[data-testId="userInput"]`).setValue('テストメッセージ')
      await wrapper.find(`[data-testId="sendMessage"]`).trigger('click')

      await wrapper.find(`[data-testId="userInput"]`).setValue('テストメッセージ')
      await wrapper.find(`[data-testId="sendMessage"]`).trigger('click')

      await wait(300)

      expect(reflection.studentReflections.value?.length).toBe(3)
      expect(wrapper.find(`[data-testId="chatInput"]`).exists()).toBe(false)
    })
  })
})
