// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import ShowCourseCard from '@/components/Domain/Student/index/ShowCourseCard.vue'
import { MOCK_AUTH_USER, wait } from '@/test/mocks/index'
import { registerUserCourseEndpoints } from '@/test/mocks/userCourse/endpoints'
import { MOCK_STUDENT_COURSE } from '@/test/mocks/course/index'

mockComponent('BaseEmpty', {
  template: '<div data-testId="empty">stub empty course</div>'
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    handleLeaveAction: (_actionId: number, course: StudentCourse) => void
  }
}

describe('ShowCourseCardコンポーネントのテスト', () => {
  let auth: AuthReturnType
  let userCourse: UserCourseReturnType
  registerUserCourseEndpoints()

  beforeEach(() => {
    auth = useAuth()
    userCourse = useUserCourseApi()
  })

  afterEach(() => {
    auth.authUser.value = null
    userCourse.studentCourses.value = null
    userCourse.isStudentCourseLoading.value = true
  })

  describe('受講中の授業が存在しない場合', () => {
    it('授業がないことを示すコンポーネントが表示される', async () => {
      const wrapper = await mountSuspended(ShowCourseCard)
      userCourse.studentCourses.value = []
      userCourse.isStudentCourseLoading.value = false

      await wrapper.vm.$nextTick()

      expect(wrapper.find(`[data-testId="empty"]`).exists()).toBe(true)
    })
  })

  describe('受講中の授業が存在する場合', () => {
    it('授業カードが表示される', async () => {
      const wrapper = await mountSuspended(ShowCourseCard)
      userCourse.studentCourses.value = MOCK_STUDENT_COURSE
      userCourse.isStudentCourseLoading.value = false

      await wrapper.vm.$nextTick()

      expect(userCourse.studentCourses.value).toBeTruthy()

      if (!userCourse.studentCourses.value) return

      const cardHref = wrapper.find(`[data-testId="card-0"]`).get('a').attributes('href')

      expect(cardHref).toBe(`/student/course/${userCourse.studentCourses.value[0].uuid}`)

      const courseCard = wrapper.find(`[data-testId="card-0"]`).text()

      expect(courseCard).toContain(userCourse.studentCourses.value[0].teacher_name)
      expect(courseCard).toContain(userCourse.studentCourses.value[0].course_time)
      expect(courseCard).toContain(userCourse.studentCourses.value[0].day_of_week)
    })

    it('選択した授業から退出することができる', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      const wrapper = await mountSuspended(ShowCourseCard)
      userCourse.studentCourses.value = MOCK_STUDENT_COURSE
      userCourse.isStudentCourseLoading.value = false

      await wrapper.vm.$nextTick()

      expect(userCourse.studentCourses.value).toBeTruthy()

      if (!userCourse.studentCourses.value) return

      wrapper.vm.handleLeaveAction(0, userCourse.studentCourses.value[0])

      await wrapper.vm.$nextTick()

      expect(wrapper.find(`[data-testId="leaveDialog"]`).exists()).toBe(true)

      await wrapper.find(`[data-testId="clickLeave"]`).trigger('click')
      await wait(100)

      expect(userCourse.studentCourses.value.length).toBe(0)
    })
  })
})
