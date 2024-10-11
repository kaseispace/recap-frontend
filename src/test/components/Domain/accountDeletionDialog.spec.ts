// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import AccountDeletionDialog from '@/components/Domain/AccountDeletionDialog.vue'
import { mockAuthUser, wait } from '@/test/mocks/index'
import { mockCurrentUserSchoolData } from '@/test/mocks/user/index'
import { registerUserEndpoints } from '@/test/mocks/user/endpoints'

mockComponent('BaseButton', {
  template: '<div>stub button</div>'
})

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
    auth.authUser.value = mockAuthUser
    user.userInfo.value = mockCurrentUserSchoolData
    const wrapper = await mountSuspended(AccountDeletionDialog)

    await wrapper.find(`[data-testId="clickDelete"]`).trigger('click')
    await wait(10)

    expect(user.userInfo.value).toBe(null)
    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)
  })
})
