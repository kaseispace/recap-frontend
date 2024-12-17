// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ReflectionSwitchDialog from '@/components/Domain/Teacher/course/SettingsMenu/ReflectionSwitchDialog.vue'
import { MOCK_TEACHER_AUTH_USER, wait } from '@/test/mocks/index'
import { registerCourseDateEndpoints } from '@/test/mocks/courseDate/endpoints'
import { MOCK_COURSE_DATES } from '@/test/mocks/courseDate/index'

describe('ReflectionSwitchDialogコンポーネントのテスト', () => {
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
    it('振り返りを実施する場合、実施予定であることが表示され、振り返りを無効にできる', async () => {
      auth.authUser.value = MOCK_TEACHER_AUTH_USER
      setting.nextCourseDate.value = MOCK_COURSE_DATES[4]
      courseDate.courseDates.value = MOCK_COURSE_DATES
      const wrapper = await mountSuspended(ReflectionSwitchDialog)

      expect(wrapper.find(`[data-testId="nextCourse"]`).text()).toContain('この日に振り返りを実施する予定です')

      await wrapper.find(`[data-testId="clickChange"]`).trigger('click')
      await wait(300)

      expect(courseDate.courseDates.value[4].is_reflection).toBe(false)
    })

    it('振り返りを実施しない場合、実施予定がないことが表示され、振り返りを有効にできる', async () => {
      auth.authUser.value = MOCK_TEACHER_AUTH_USER
      setting.nextCourseDate.value = MOCK_COURSE_DATES[4]
      setting.nextCourseDate.value.is_reflection = false
      courseDate.courseDates.value = MOCK_COURSE_DATES
      courseDate.courseDates.value[4].is_reflection = false
      const wrapper = await mountSuspended(ReflectionSwitchDialog)

      expect(wrapper.find(`[data-testId="nextCourse"]`).text()).toContain('この日は振り返りを実施しない予定です')

      await wrapper.find(`[data-testId="clickChange"]`).trigger('click')
      await wait(300)

      expect(courseDate.courseDates.value[4].is_reflection).toBe(true)
    })

    it('キャンセルボタンを押すと、ダイアログが閉じる', async () => {
      setting.nextCourseDate.value = MOCK_COURSE_DATES[4]
      courseDate.courseDates.value = MOCK_COURSE_DATES
      const wrapper = await mountSuspended(ReflectionSwitchDialog)

      expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(true)

      await wrapper.find(`[data-testId="clickCancel"]`).trigger('click')

      expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)
    })
  })
})
