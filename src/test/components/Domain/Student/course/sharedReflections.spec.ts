// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import SharedReflections from '@/components/Domain/Student/course/SharedReflections.vue'
import { MOCK_AUTH_USER, MOCK_EMPTY_UUID, MOCK_UUID, wait } from '@/test/mocks/index'
import { registerReflectionEndpoints } from '@/test/mocks/reflection/endpoints'

mockComponent('BaseEmpty', {
  template: '<div data-testId="empty">stub empty group reflection</div>'
})

mockComponent('BaseCardPostIt', {
  template: '<div>stub post it</div>'
})

mockComponent('BaseDialog', {
  template: '<div data-testId="dialog">stub dialog</div>'
})

describe('SharedReflectionsコンポーネントのテスト', () => {
  let auth: AuthReturnType
  let course: CourseApiReturnType
  let reflection: ReflectionApiReturnType
  registerReflectionEndpoints()

  beforeEach(() => {
    auth = useAuth()
    course = useCourseApi()
    reflection = useReflectionApi()
  })

  afterEach(() => {
    auth.authUser.value = null
    reflection.sharedCourseReflections.value = null
    reflection.selectedCourseDateReflections.value = null
  })

  describe('みんなの振り返りが存在しない場合', () => {
    it('みんなの振り返りがないことを示すコンポーネントが表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_EMPTY_UUID
      const wrapper = await mountSuspended(SharedReflections)

      await wait(100)

      expect(wrapper.find(`[data-testId="empty"]`).exists()).toBe(true)
    })
  })

  describe('振り返りが存在する場合', () => {
    it('振り返り済みの授業回がChipsに表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(SharedReflections)

      await wait(100)

      if (reflection.sharedCourseReflections.value) {
        for (let i = 0; i < reflection.sharedCourseReflections.value.length; i++) {
          const chip = wrapper.find(`[data-testId="chip-${i}"]`).text()
          expect(chip).toBe(reflection.sharedCourseReflections.value[i].course_number)
        }
      }
    })

    it('初期表示は最初の振り返りが表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(SharedReflections)

      await wait(100)

      if (reflection.sharedCourseReflections.value) {
        for (let i = 0; i < reflection.sharedCourseReflections.value[0].users_reflections.length; i++) {
          expect(wrapper.find(`[data-testId="postIt-${i}"]`).exists()).toBe(true)
        }
      }
    })

    it('選択した授業回のみんなの振り返りが表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(SharedReflections)

      await wait(100)

      await wrapper.find(`[data-testId="chip-1"]`).trigger('click')

      if (reflection.sharedCourseReflections.value) {
        for (let i = 0; i < reflection.sharedCourseReflections.value[1].users_reflections.length; i++) {
          expect(wrapper.find(`[data-testId="postIt-${i}"]`).exists()).toBe(true)
        }
      }
    })

    it('付箋コンポーネントをクリックすると、詳細な振り返りが表示されるダイアログが開く', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(SharedReflections)

      await wait(100)

      await wrapper.find(`[data-testId="postIt-0"]`).trigger('click')

      expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(true)
    })
  })
})
