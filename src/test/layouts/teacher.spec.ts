// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import teacherLayout from '@/layouts/teacher.vue'
import { MOCK_AUTH_USER, wait } from '@/test/mocks/index'
import { MOCK_USER_SCHOOL } from '@/test/mocks/user/index'
import { registerCourseEndpoints } from '@/test/mocks/course/endpoints'

mockComponent('BaseLayoutSideBar', {
  template: '<div data-testId="sidebar">stub sidebar</div>'
})

mockComponent('BaseLayoutAppBar', {
  template: '<div data-testId="appbar">stub appbar</div>'
})

mockComponent('BaseLayoutFooter', {
  template: '<div data-testId="footer">stub footer</div>'
})

describe('teacherLayoutのテスト', () => {
  let auth: AuthReturnType
  let user: UserApiReturnType
  let course: CourseApiReturnType
  registerCourseEndpoints()

  beforeEach(() => {
    auth = useAuth()
    user = useUserApi()
    course = useCourseApi()
  })

  afterEach(() => {
    auth.authUser.value = null
    user.userInfo.value = null
    course.teacherCourses.value = null
  })

  it('コンポーネントが正しく表示される', async () => {
    auth.authUser.value = MOCK_AUTH_USER
    user.userInfo.value = MOCK_USER_SCHOOL
    course.teacherCourses.value = null
    const wrapper = await mountSuspended(teacherLayout)

    await wait(10)

    expect(wrapper.find(`[data-testId="sidebar"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testId="appbar"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testId="footer"]`).exists()).toBe(true)
  })
})
