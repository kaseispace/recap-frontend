// @vitest-environment nuxt
import { mockComponent, mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import LoginForm from '@/components/Domain/LoginForm.vue'
import { MOCK_STUDENT_AUTH_USER, wait } from '@/test/mocks/index'
import { registerUserEndpoints } from '@/test/mocks/user/endpoints'
import { MOCK_STUDENT_USER_SCHOOL } from '@/test/mocks/user/index'

mockComponent('BaseLink', {
  template: '<a>stub link</a>'
})

mockComponent('BaseButton', {
  template: '<button data-testId="button">stub button</button>'
})

mockNuxtImport('navigateTo', () => vi.fn())

vi.mock('@/composables/useAuth', () => ({
  useAuth: () => {
    const authUser = ref(null)
    const login = vi.fn(() => MOCK_STUDENT_AUTH_USER)
    return { authUser, login }
  }
}))

describe('LoginFormコンポーネントのテスト', () => {
  let user: UserApiReturnType
  registerUserEndpoints()

  beforeEach(() => {
    user = useUserApi()
  })

  afterEach(() => {
    user.userInfo.value = null
  })

  it('ログイン成功時にユーザー情報が設定され、指定のページに遷移する', async () => {
    const wrapper = await mountSuspended(LoginForm)

    await wrapper.get(`[data-testId="input-email"]`).setValue('mockstudent@example.com')
    await wrapper.get(`[data-testId="input-password"]`).setValue('password')

    await wrapper.get('form').trigger('submit')

    await wait(10)

    expect(user.userInfo.value).toEqual(MOCK_STUDENT_USER_SCHOOL)
    expect(navigateTo).toHaveBeenCalledWith('/student')
  })
})
