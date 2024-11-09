// @vitest-environment nuxt
import { mockNuxtImport, mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import idPage from '@/pages/teacher/course/[id].vue'
import { MOCK_AUTH_USER, wait } from '@/test/mocks/index'
import { registerCourseAdditionalEndpoints } from '@/test/mocks/course/endpoints'
import { registerCourseDateEndpoints } from '@/test/mocks/courseDate/endpoints'
import { MOCK_COURSES, MOCK_COURSES_WITH_ERROR } from '@/test/mocks/course/index'

mockNuxtImport('useRoute', () => {
  return () => ({
    params: {
      id: '6dcd4ce8-d0f6-4a9d-b36d-8fe6500d384f'
    }
  })
})

mockComponent('BaseError404', {
  template: '<div data-testId="404">stub 404</div>'
})

mockComponent('BaseButton', {
  template: '<div data-testId="button">stub button</div>'
})

mockComponent('BaseTitle', {
  template: '<div data-testId="title">stub title</div>'
})

mockComponent('DomainTeacherCourseSettingsMenuCourseDateAndReflectionAdded', {
  template: '<div data-testId="setting1">stub setting1</div>'
})

mockComponent('DomainTeacherCourseSettingsMenuCourseDateAddedNoReflection', {
  template: '<div data-testId="setting2">stub setting2</div>'
})

mockComponent('DomainTeacherCourseSettingsMenuNoCourseDate', {
  template: '<div data-testId="setting3">stub setting3</div>'
})

mockComponent('DomainTeacherCourseCreateAnnouncementCard', {
  template: '<div data-testId="createAnnouncement">stub create announcement</div>'
})

mockComponent('DomainTeacherCourseShowAnnouncementCard', {
  template: '<div data-testId="showAnnouncement">stub show announcement</div>'
})

mockComponent('DomainTeacherCourseCreatePromptCard', {
  template: '<div data-testId="createPrompt">stub create prompt</div>'
})

mockComponent('DomainTeacherCourseShowPromptCard', {
  template: '<div data-testId="showPrompt">stub show prompt </div>'
})

mockComponent('DomainTeacherCourseReflectionBot', {
  template: '<div data-testId="bot">stub bot </div>'
})

mockComponent('DomainTeacherCourseReflectionHistory', {
  template: '<div data-testId="reflectionHistory">stub reflection history</div>'
})

describe('授業詳細ページのテスト', () => {
  let auth: AuthReturnType
  let course: CourseApiReturnType
  registerCourseAdditionalEndpoints()
  registerCourseDateEndpoints()

  beforeEach(() => {
    auth = useAuth()
    course = useCourseApi()
  })

  afterEach(() => {
    auth.authUser.value = null
    course.teacherCourses.value = null
    course.currentCourse.value = null
  })

  describe('teacherCoursesを既に取得済みの場合', () => {
    it('ルートパラメータと一致する授業が存在しない場合、エラーコンポーネントを表示する', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.teacherCourses.value = MOCK_COURSES_WITH_ERROR
      const wrapper = await mountSuspended(idPage)

      await wait(10)

      expect(wrapper.find(`[data-testId="404"]`).exists()).toBe(true)
    })

    it('ルートパラメータと一致する授業が存在する場合、お知らせコンポーネントが表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.teacherCourses.value = MOCK_COURSES
      const wrapper = await mountSuspended(idPage)

      await wait(100)

      expect(wrapper.find(`[data-testId="title"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="setting3"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="createAnnouncement"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="showAnnouncement"]`).exists()).toBe(true)
    })
  })

  describe('teacherCoursesがnullの場合', () => {
    it('ルートパラメータと一致する授業が存在する場合、お知らせコンポーネントが表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      const wrapper = await mountSuspended(idPage)

      await wait(100)

      expect(wrapper.find(`[data-testId="title"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="setting3"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="createAnnouncement"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="showAnnouncement"]`).exists()).toBe(true)
    })

    it('振り返りタブをクリックすると、振り返りコンポーネントに切り替わる', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      const wrapper = await mountSuspended(idPage)

      await wait(100)

      await wrapper.find(`[data-testId="tabIndex-1"]`).trigger('click')
      await wait(100)

      expect(wrapper.find(`[data-testId="createPrompt"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="showPrompt"]`).exists()).toBe(true)
    })

    it('受講生振り返り履歴タブをクリックすると、振り返り履歴コンポーネントに切り替わる', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      const wrapper = await mountSuspended(idPage)

      await wait(100)

      await wrapper.find(`[data-testId="tabIndex-2"]`).trigger('click')
      await wait(100)

      expect(wrapper.find(`[data-testId="reflectionHistory"]`).exists()).toBe(true)
    })
  })
})
