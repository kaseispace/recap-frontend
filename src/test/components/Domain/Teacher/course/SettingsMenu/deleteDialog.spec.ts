// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DeleteDialog from '@/components/Domain/Teacher/course/SettingsMenu/DeleteDialog.vue'
import { mockAuthUser, wait } from '@/test/mocks/index'
import { registerCourseDateEndpoints } from '@/test/mocks/courseDate/endpoints'
import { mockCourseDatesData } from '@/test/mocks/courseDate/index'

describe('DeleteDialogコンポーネントのテスト', () => {
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
    it('授業日を削除できる', async () => {
      auth.authUser.value = mockAuthUser
      setting.nextCourseDate.value = mockCourseDatesData[4]
      courseDate.courseDates.value = mockCourseDatesData
      const wrapper = await mountSuspended(DeleteDialog)

      expect(wrapper.find(`[data-testId="nextCourse"]`).exists()).toBe(true)

      await wrapper.find(`[data-testId="clickDelete"]`).trigger('click')
      await wait(300)

      expect(courseDate.courseDates.value).not.toEqual(mockCourseDatesData[4])
    })

    it('キャンセルボタンを押すと、ダイアログが閉じる', async () => {
      setting.nextCourseDate.value = mockCourseDatesData[4]
      courseDate.courseDates.value = mockCourseDatesData
      const wrapper = await mountSuspended(DeleteDialog)

      expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(true)

      await wrapper.find(`[data-testId="clickCancel"]`).trigger('click')

      expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)
    })
  })
})