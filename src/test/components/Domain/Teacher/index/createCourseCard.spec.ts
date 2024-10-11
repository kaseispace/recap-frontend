// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import CreateCourseCard from '@/components/Domain/Teacher/index/CreateCourseCard.vue'
import { mockAuthUser, wait } from '@/test/mocks/index'
import { mockUserSchoolData } from '@/test/mocks/user/index'
import { registerCourseEndpoints } from '@/test/mocks/course/endpoints'

mockComponent('BaseButton', {
  template: '<button>stub button</button>'
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    dayOfWeek: Ref<string>
    courseTime: Ref<string>
  }
}

describe('CreateCourseCardコンポーネントのテスト', () => {
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
    course.teacherCourses.value = null
    user.userInfo.value = null
  })

  it('ダイアログがクリックで正しく開閉する', async () => {
    const wrapper = await mountSuspended(CreateCourseCard)

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)

    await wrapper.get(`[data-testId="button"]`).trigger('click')

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(true)

    await wrapper.find(`[data-testId="clickCancel"]`).trigger('click')

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)
  })

  describe('バリデーション', () => {
    it('全ての入力フィールドが値が空の場合、エラーメッセージが表示される', async () => {
      const wrapper = await mountSuspended(CreateCourseCard)

      await wrapper.get(`[data-testId="button"]`).trigger('click')

      await wrapper.find(`[data-testId="createButton"]`).trigger('click')
      await wait(100)

      expect(wrapper.find(`[data-testId="errorName"]`).text()).toBe('必須項目です')
      expect(wrapper.find(`[data-testId="errorTeacherName"]`).text()).toBe('必須項目です')
      expect(wrapper.find(`[data-testId="errorWeek"]`).text()).toBe('必須項目です')
      expect(wrapper.find(`[data-testId="errorTime"]`).text()).toBe('必須項目です')
    })

    it('全ての入力フィールドに有効な値が入力されている場合、エラーメッセージが表示されず、授業を作成できる', async () => {
      auth.authUser.value = mockAuthUser
      user.userInfo.value = mockUserSchoolData
      course.teacherCourses.value = [] // まだ作成した授業がない
      const wrapper = await mountSuspended(CreateCourseCard)

      await wrapper.get(`[data-testId="button"]`).trigger('click')
      await wrapper.find(`[data-testId="name"]`).setValue('数学')
      await wrapper.find(`[data-testId="teacherName"]`).setValue('山田太郎')

      wrapper.vm.dayOfWeek.value = '火曜日'
      wrapper.vm.courseTime.value = '2限'

      await wrapper.find(`[data-testId="createButton"]`).trigger('click')
      await wait(100)

      expect(wrapper.find(`[data-testId="errorName"]`).exists()).toBe(false)
      expect(wrapper.find(`[data-testId="errorTeacherName"]`).exists()).toBe(false)
      expect(wrapper.find(`[data-testId="errorWeek"]`).exists()).toBe(false)
      expect(wrapper.find(`[data-testId="errorTime"]`).exists()).toBe(false)
      expect(course.teacherCourses.value.length).toBe(1)
    })
  })
})
