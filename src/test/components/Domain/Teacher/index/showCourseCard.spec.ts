// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import ShowCourseCard from '@/components/Domain/Teacher/index/ShowCourseCard.vue'
import { MOCK_AUTH_USER, wait } from '@/test/mocks/index'
import { registerCourseEndpoints } from '@/test/mocks/course/endpoints'
import { MOCK_COURSES } from '@/test/mocks/course/index'

mockComponent('BaseEmpty', {
  template: '<div data-testId="empty">stub empty course</div>'
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    handleEditOrDeleteAction: (actionId: number, course: Course) => void
  }
}

describe('ShowCourseCardコンポーネントのテスト', () => {
  let auth: AuthReturnType
  let course: CourseApiReturnType
  registerCourseEndpoints()

  beforeEach(() => {
    auth = useAuth()
    course = useCourseApi()
  })

  afterEach(() => {
    auth.authUser.value = null
    course.teacherCourses.value = null
    course.isTeacherCourseLoading.value = true
  })

  describe('担当授業が存在しない場合', () => {
    it('授業がないことを示すコンポーネントが表示される', async () => {
      const wrapper = await mountSuspended(ShowCourseCard)
      course.teacherCourses.value = []
      course.isTeacherCourseLoading.value = false

      await wrapper.vm.$nextTick()

      expect(wrapper.find(`[data-testId="empty"]`).exists()).toBe(true)
    })
  })

  describe('担当授業が存在する場合', () => {
    it('授業カードが表示される', async () => {
      const wrapper = await mountSuspended(ShowCourseCard)
      course.teacherCourses.value = MOCK_COURSES
      course.isTeacherCourseLoading.value = false

      await wrapper.vm.$nextTick()

      expect(course.teacherCourses.value).toBeTruthy()

      if (!course.teacherCourses.value) return

      for (let i = 0; i < course.teacherCourses.value.length; i++) {
        const cardHref = wrapper.find(`[data-testId="card-${i}"]`).get('a').attributes('href')

        expect(cardHref).toBe(`/teacher/course/${course.teacherCourses.value[i].uuid}`)

        const courseCard = wrapper.find(`[data-testId="card-${i}"]`).text()

        expect(courseCard).toContain(course.teacherCourses.value[i].course_time)
        expect(courseCard).toContain(course.teacherCourses.value[i].day_of_week)
      }
    })

    it('編集用ダイアログが表示され、授業の編集ができる', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      const wrapper = await mountSuspended(ShowCourseCard)

      course.teacherCourses.value = MOCK_COURSES
      course.isTeacherCourseLoading.value = false

      await wrapper.vm.$nextTick()

      expect(course.teacherCourses.value).toBeTruthy()

      if (!course.teacherCourses.value) return

      wrapper.vm.handleEditOrDeleteAction(1, course.teacherCourses.value[0])

      await wrapper.vm.$nextTick()

      expect(wrapper.find(`[data-testId="editDialog"]`).exists()).toBe(true)

      await wrapper.find(`[data-testId="name"]`).setValue('データサイエンス入門')
      await wrapper.find(`[data-testId="clickEdit"]`).trigger('click')
      await wait(100)

      expect(course.teacherCourses.value[0].name).toBe('データサイエンス入門')
    })

    it('削除用ダイアログが表示され、授業を削除できる', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      const wrapper = await mountSuspended(ShowCourseCard)

      course.teacherCourses.value = MOCK_COURSES
      course.isTeacherCourseLoading.value = false

      await wrapper.vm.$nextTick()

      expect(course.teacherCourses.value).toBeTruthy()

      if (!course.teacherCourses.value) return

      wrapper.vm.handleEditOrDeleteAction(2, course.teacherCourses.value[0])

      await wrapper.vm.$nextTick()

      expect(wrapper.find(`[data-testId="deleteDialog"]`).exists()).toBe(true)

      await wrapper.find(`[data-testId="clickDelete"]`).trigger('click')
      await wait(100)

      expect(course.teacherCourses.value).not.toEqual(MOCK_COURSES[0])
    })
  })
})
