// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { mockComponent } from '@nuxt/test-utils/runtime'
import errorPage from '@/error.vue'
import { MOCK_STUDENT_AUTH_USER, wait } from '@/test/mocks/index'
import { MOCK_STUDENT_USER_SCHOOL } from '@/test/mocks/user/index'
import { registerUserCourseEndpoints } from '@/test/mocks/userCourse/endpoints'

mockComponent('BaseLayoutSideBar', {
  template: '<div data-testId="sidebar">stub sidebar</div>'
})

mockComponent('BaseLayoutMobileSideBar', {
  template: '<div>stub mobile sidebar</div>'
})

mockComponent('NuxtLink', {
  template: '<a data-testId="logo-link">stub logo link</a>'
})

mockComponent('BaseMoreAccount', {
  template: '<div data-testId="account">stub account</div>'
})

mockComponent('BaseLink', {
  template: '<a data-testId="link">stub link</a>'
})

mockComponent('BaseError404', {
  template: '<div>stub error</div>'
})

mockComponent('BaseButton', {
  template: '<button>stub button</button>'
})

mockComponent('BaseLayoutFooter', {
  template: '<div data-testId="footer">stub footer</div>'
})

describe('errorPageページのテスト', () => {
  let auth: AuthReturnType
  let user: UserApiReturnType
  let userCourse: UserCourseReturnType
  registerUserCourseEndpoints()

  beforeEach(() => {
    auth = useAuth()
    user = useUserApi()
    userCourse = useUserCourseApi()
  })

  afterEach(() => {
    auth.authUser.value = null
    user.userInfo.value = null
    userCourse.studentCourses.value = null
  })

  describe('非ログイン時', () => {
    it('404エラーページが正しく表示される', async () => {
      auth.authUser.value = null
      user.userInfo.value = null
      const wrapper = mount(errorPage, {
        props: { error: { statusCode: 404 } }
      })

      await wait(10)

      // 非表示コンポーネント
      expect(wrapper.find(`[data-testId="sidebar"]`).exists()).toBe(false)
      expect(wrapper.find(`[data-testid="schoolName"]`).text()).toBe('')
      expect(wrapper.find(`[data-testId="account"]`).exists()).toBe(false)

      // 表示コンポーネント
      expect(wrapper.find(`[data-testId="logo-link"]`).exists()).toBe(true)
      expect(wrapper.findAll(`[data-testId="link"]`).length).toBe(2)
      expect(wrapper.find(`[img-path="404_n72mzp.png"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="footer"]`).exists()).toBe(true)
    })
  })

  describe('ログイン時', () => {
    it('404エラーページが正しく表示される', async () => {
      auth.authUser.value = MOCK_STUDENT_AUTH_USER
      user.userInfo.value = MOCK_STUDENT_USER_SCHOOL
      const wrapper = mount(errorPage, {
        props: { error: { statusCode: 404 } }
      })

      await wait(10)

      // 非表示コンポーネント
      expect(wrapper.find(`[data-testId="link"]`).exists()).toBe(false)

      // 表示コンポーネント
      expect(wrapper.find(`[data-testId="sidebar"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testid="schoolName"]`).text()).toBe('フルスタック大学')
      expect(wrapper.find(`[data-testId="account"]`).exists()).toBe(true)
      expect(wrapper.find(`[img-path="s-404_eadka6.png"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="footer"]`).exists()).toBe(true)
    })
  })
})
