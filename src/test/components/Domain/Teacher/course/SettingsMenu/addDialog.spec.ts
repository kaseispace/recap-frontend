// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AddDialog from '@/components/Domain/Teacher/course/SettingsMenu/AddDialog.vue'
import { mockAuthUser, dataUUID, wait } from '@/test/mocks/index'
import { registerCourseDateEndpoints } from '@/test/mocks/courseDate/endpoints'
import { expectedCreateCourseDateData } from '@/test/mocks/courseDate/index'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    courseSession: Ref<string>
    courseDate: Ref<string>
  }
}

describe('AddDialogコンポーネントのテスト', () => {
  let auth: AuthReturnType
  let course: CourseApiReturnType
  let courseDate: CourseDateApiReturnType
  let setting: SettingReturnType
  registerCourseDateEndpoints()

  beforeEach(() => {
    auth = useAuth()
    course = useCourseApi()
    courseDate = useCourseDateApi()
    setting = useSetting()
  })

  afterEach(() => {
    auth.authUser.value = null
    setting.nextCourseDate.value = undefined
  })

  describe('次回授業日がまだない場合', () => {
    it('授業日を追加できる', async () => {
      auth.authUser.value = mockAuthUser
      course.courseUuid.value = dataUUID
      courseDate.courseDates.value = []
      const wrapper = await mountSuspended(AddDialog)

      expect(wrapper.find(`[data-testId="nextCourse"]`).exists()).toBe(false)

      wrapper.vm.courseSession.value = '1'
      wrapper.vm.courseDate.value = '2024/4/1'

      await wrapper.find(`[data-testId="clickAdd"]`).trigger('click')
      await wait(300)

      expect(courseDate.courseDates.value[0]).toEqual(expectedCreateCourseDateData)
    })

    it('キャンセルボタンを押すと、ダイアログが閉じる', async () => {
      auth.authUser.value = mockAuthUser
      course.courseUuid.value = dataUUID
      courseDate.courseDates.value = []
      const wrapper = await mountSuspended(AddDialog)

      expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(true)

      await wrapper.find(`[data-testId="clickCancel"]`).trigger('click')

      expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)
    })
  })
})
