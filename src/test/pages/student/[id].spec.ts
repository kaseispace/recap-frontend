// @vitest-environment nuxt
import { mockNuxtImport, mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import idPage from '@/pages/student/course/[id].vue'
import { MOCK_AUTH_USER, wait } from '@/test/mocks/index'
import { registerUserCourseAdditionalEndpoints } from '@/test/mocks/userCourse/endpoints'
import { registerCourseDateEndpoints } from '@/test/mocks/courseDate/endpoints'
import { MOCK_STUDENT_COURSES_WITH_ERROR, MOCK_STUDENT_COURSES } from '@/test/mocks/course/index'

mockNuxtImport('useRoute', () => {
  return () => ({
    params: {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
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

mockComponent('DomainStudentCourseShowAnnouncementCard', {
  template: '<div data-testId="announcementCard">stub announcement card</div>'
})

mockComponent('DomainStudentCourseReflectionHistory', {
  template: '<div data-testId="reflectionHistory">stub reflection history</div>'
})

mockComponent('DomainStudentCourseReflectionBot', {
  template: '<div data-testId="bot">stub bot</div>'
})

describe('授業ページのテスト', () => {
  let auth: AuthReturnType
  let userCourse: UserCourseReturnType
  registerUserCourseAdditionalEndpoints()
  registerCourseDateEndpoints()

  beforeEach(() => {
    auth = useAuth()
    userCourse = useUserCourseApi()
  })

  afterEach(() => {
    auth.authUser.value = null
    userCourse.studentCourses.value = null
    userCourse.currentStudentCourse.value = null
  })

  describe('studentCoursesを既に取得済みの場合', () => {
    it('ルートパラメータと一致する授業が存在しない場合、エラーコンポーネントを表示する', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      userCourse.studentCourses.value = MOCK_STUDENT_COURSES_WITH_ERROR
      const wrapper = await mountSuspended(idPage)

      await wait(10)

      expect(wrapper.find(`[data-testId="404"]`).exists()).toBe(true)
    })

    it('ルートパラメータと一致する授業が存在する場合、お知らせコンポーネントが表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      userCourse.studentCourses.value = MOCK_STUDENT_COURSES
      const wrapper = await mountSuspended(idPage)

      await wait(100)

      expect(wrapper.find(`[data-testId="title"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="announcementCard"]`).exists()).toBe(true)
    })
  })

  describe('studentCoursesがnullの場合', () => {
    it('ルートパラメータと一致する授業が存在する場合、お知らせコンポーネントが表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      const wrapper = await mountSuspended(idPage)

      await wait(100)

      expect(wrapper.find(`[data-testId="title"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="announcementCard"]`).exists()).toBe(true)
    })

    it('振り返り履歴タブをクリックすると、振り返り履歴コンポーネントに切り替わる', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      const wrapper = await mountSuspended(idPage)

      await wait(100)

      await wrapper.find(`[data-testId="tabIndex-1"]`).trigger('click')
      await wait(100)

      expect(wrapper.find(`[data-testId="reflectionHistory"]`).exists()).toBe(true)
    })
  })
})
