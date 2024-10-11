// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CourseCodeDialog from '@/components/Domain/Teacher/course/SettingsMenu/CourseCodeDialog.vue'

describe('CourseCodeDialogコンポーネントのテスト', () => {
  let course: CourseApiReturnType
  const courseCode = 'eNg102'

  beforeEach(() => {
    course = useCourseApi()
  })

  it('クラスコードダイアログにクラスコードが表示されている', async () => {
    course.courseCode.value = courseCode
    const wrapper = await mountSuspended(CourseCodeDialog)

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testId="courseCode"]`).text()).toBe(courseCode)
  })
})
