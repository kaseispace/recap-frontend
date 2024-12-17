// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import AccountDeletionDialog from '@/components/Domain/AccountDeletionDialog.vue'
import { MOCK_STUDENT_AUTH_USER, MOCK_EMAIL_AUTH_CREDENTIAL, wait } from '@/test/mocks/index'
import { MOCK_STUDENT_USER_SCHOOL } from '@/test/mocks/user/index'
import { registerUserEndpoints } from '@/test/mocks/user/endpoints'

mockComponent('BaseButton', {
  template: '<div>stub button</div>'
})

vi.mock('firebase/auth', () => ({
  EmailAuthProvider: {
    credential: vi.fn(() => MOCK_EMAIL_AUTH_CREDENTIAL)
  },
  reauthenticateWithCredential: vi.fn()
}))

describe('AccountDeletionDialogコンポーネントのテスト', () => {
  let auth: AuthReturnType
  let user: UserApiReturnType
  registerUserEndpoints()

  beforeEach(() => {
    auth = useAuth()
    user = useUserApi()
  })

  afterEach(() => {
    auth.authUser.value = null
    user.userInfo.value = null
  })

  it('アカウント削除時、ユーザー情報が初期化され、ダイアログが閉じる', async () => {
    auth.authUser.value = MOCK_STUDENT_AUTH_USER
    user.userInfo.value = MOCK_STUDENT_USER_SCHOOL
    const wrapper = await mountSuspended(AccountDeletionDialog)

    await wait(10)

    await wrapper.find(`[data-testId="input-password"]`).setValue('password')
    await wrapper.find(`[data-testId="clickDelete"]`).trigger('click')

    await wait(10)

    expect(user.userInfo.value).toBe(null)
    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)
  })
})
