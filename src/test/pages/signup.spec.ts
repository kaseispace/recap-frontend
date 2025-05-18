// @vitest-environment nuxt
import { mockComponent, mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import SignupPage from '@/pages/signup.vue'
import { MOCK_STUDENT_AUTH_USER, wait } from '@/test/mocks/index'
import { registerUserEndpoints } from '@/test/mocks/user/endpoints'
import { MOCK_STUDENT_USER_SCHOOL } from '@/test/mocks/user/index'
import { registerSchoolEndpoints } from '@/test/mocks/school/endpoints'

mockComponent('BaseButton', {
  template: '<button data-testId="button">stub button</button>'
})

mockComponent('BaseLink', {
  template: '<a>stub link</a>'
})

mockComponent('BaseDialogOverlay', {
  template: '<div data-testId="overlay">stub overlay</div>'
})

mockNuxtImport('navigateTo', () => vi.fn())

vi.mock('@/composables/useAuth', () => ({
  useAuth: () => {
    const authUser = ref(null)
    const signup = vi.fn(() => MOCK_STUDENT_AUTH_USER)
    return { authUser, signup }
  }
}))

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    roleText: Ref<string>
    schoolName: Ref<string>
  }
}

describe('signupページのテスト', () => {
  let user: UserApiReturnType
  let school: SchoolApiReturnType
  registerUserEndpoints()
  registerSchoolEndpoints()

  beforeEach(() => {
    user = useUserApi()
    school = useSchoolApi()
  })

  afterEach(() => {
    user.userInfo.value = null
    school.schoolInfo.value = null
  })

  it('サインアップ成功時にユーザー情報が設定され、指定のページに遷移する', async () => {
    const wrapper = await mountSuspended(SignupPage)

    await wrapper.get(`[data-testId="input-name"]`).setValue('中村八郎')
    await wrapper.get(`[data-testId="input-email"]`).setValue('mockstudent@example.com')
    await wrapper.get(`[data-testId="input-password"]`).setValue('password')
    await wrapper.get(`[data-testId="input-password-confirm"]`).setValue('password')
    wrapper.vm.roleText.value = '学生'
    wrapper.vm.schoolName.value = 'フルスタック大学'

    await wrapper.get('form').trigger('submit')

    await wait(100)

    expect(user.userInfo.value).toEqual(MOCK_STUDENT_USER_SCHOOL)
    expect(navigateTo).toHaveBeenCalledWith('/student')
  })
})
