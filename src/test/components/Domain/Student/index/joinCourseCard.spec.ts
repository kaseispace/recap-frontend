// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import JoinCourseCard from '@/components/Domain/Student/index/JoinCourseCard.vue'
import { MOCK_STUDENT_AUTH_USER, wait } from '@/test/mocks/index'
import { MOCK_STUDENT_USER_SCHOOL } from '@/test/mocks/user/index'
import { registerUserCourseEndpoints } from '@/test/mocks/userCourse/endpoints'

mockComponent('BaseButton', {
  template: '<button>stub button</button>'
})

describe('JoinCourseCardコンポーネントのテスト', () => {
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
    userCourse.studentCourses.value = null
    user.userInfo.value = null
  })

  it('ダイアログがクリックで正しく開閉する', async () => {
    const wrapper = await mountSuspended(JoinCourseCard)

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)

    await wrapper.get(`[data-testId="button"]`).trigger('click')

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(true)

    await wrapper.find(`[data-testId="clickCancel"]`).trigger('click')

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)
  })

  describe('バリデーション', () => {
    it('クラスコード入力フィールドが空の場合、エラーメッセージが表示される', async () => {
      const wrapper = await mountSuspended(JoinCourseCard)

      await wrapper.get(`[data-testId="button"]`).trigger('click')

      await wrapper.find(`[data-testId="clickJoin"]`).trigger('click')
      await wait(100)

      expect(wrapper.find(`[data-testId="errorCourseCode"]`).text()).toBe('必須項目です')
    })

    it('クラスコード入力フィールドに有効な値が入力されている場合、エラーメッセージが表示されず、授業に参加できる', async () => {
      auth.authUser.value = MOCK_STUDENT_AUTH_USER
      user.userInfo.value = MOCK_STUDENT_USER_SCHOOL
      userCourse.studentCourses.value = [] // まだ参加している授業がない
      const wrapper = await mountSuspended(JoinCourseCard)

      await wrapper.get(`[data-testId="button"]`).trigger('click')

      await wrapper.find(`[data-testId="courseCode"]`).setValue('eNg102')
      await wrapper.find(`[data-testId="clickJoin"]`).trigger('click')
      await wait(100)

      expect(wrapper.find(`[data-testId="errorCourseCode"]`).exists()).toBe(false)
      expect(userCourse.studentCourses.value.length).toBe(1)
    })
  })
})
