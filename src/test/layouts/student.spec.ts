// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import studentLayout from '@/layouts/student.vue'
import { MOCK_STUDENT_AUTH_USER, wait } from '@/test/mocks/index'
import { MOCK_STUDENT_USER_SCHOOL } from '@/test/mocks/user/index'
import { registerUserCourseEndpoints } from '@/test/mocks/userCourse/endpoints'

mockComponent('BaseLayoutSideBar', {
  template: '<div data-testId="sidebar">stub sidebar</div>'
})

mockComponent('BaseLayoutAppBar', {
  template: '<div data-testId="appbar">stub appbar</div>'
})

mockComponent('BaseLayoutFooter', {
  template: '<div data-testId="footer">stub footer</div>'
})

describe('studentLayoutのテスト', () => {
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

  it('コンポーネントが正しく表示される', async () => {
    auth.authUser.value = MOCK_STUDENT_AUTH_USER
    user.userInfo.value = MOCK_STUDENT_USER_SCHOOL
    userCourse.studentCourses.value = null
    const wrapper = await mountSuspended(studentLayout)

    await wait(10)

    expect(wrapper.find(`[data-testId="sidebar"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testId="appbar"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testId="footer"]`).exists()).toBe(true)
  })
})
