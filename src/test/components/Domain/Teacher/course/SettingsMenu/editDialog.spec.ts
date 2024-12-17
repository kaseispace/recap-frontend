// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import EditDialog from '@/components/Domain/Teacher/course/SettingsMenu/EditDialog.vue'
import { MOCK_TEACHER_AUTH_USER, wait } from '@/test/mocks/index'
import { registerCourseDateEndpoints } from '@/test/mocks/courseDate/endpoints'
import { MOCK_COURSE_DATES } from '@/test/mocks/courseDate/index'

describe('EditDialogコンポーネントのテスト', () => {
  let auth: AuthReturnType
  let courseDate: CourseDateApiReturnType
  let setting: SettingReturnType
  registerCourseDateEndpoints()

  beforeEach(() => {
    auth = useAuth()
    courseDate = useCourseDateApi()
    setting = useSetting()
  })

  afterEach(() => {
    auth.authUser.value = null
    setting.nextCourseDate.value = undefined
    courseDate.courseDates.value = null
  })

  describe('次回授業日がある場合', () => {
    it('授業日を編集できる', async () => {
      auth.authUser.value = MOCK_TEACHER_AUTH_USER
      setting.nextCourseDate.value = MOCK_COURSE_DATES[4]
      courseDate.courseDates.value = MOCK_COURSE_DATES
      const wrapper = await mountSuspended(EditDialog)

      expect(wrapper.find(`[data-testId="nextCourse"]`).exists()).toBe(true)

      wrapper.vm.courseDate.value = '2024/5/6'

      await wrapper.find(`[data-testId="clickEdit"]`).trigger('click')
      await wait(300)

      expect(courseDate.courseDates.value[4].course_date).toBe('2024/5/6')
    })

    it('キャンセルボタンを押すと、ダイアログが閉じる', async () => {
      auth.authUser.value = MOCK_TEACHER_AUTH_USER
      setting.nextCourseDate.value = MOCK_COURSE_DATES[4]
      courseDate.courseDates.value = MOCK_COURSE_DATES
      const wrapper = await mountSuspended(EditDialog)

      expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(true)

      await wrapper.find(`[data-testId="clickCancel"]`).trigger('click')

      expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)
    })
  })
})
