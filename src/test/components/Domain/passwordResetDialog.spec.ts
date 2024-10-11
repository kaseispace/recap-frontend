// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import PasswordResetDialog from '@/components/Domain/PasswordResetDialog.vue'
import { mockAuthUser, wait } from '@/test/mocks/index'

mockComponent('BaseButton', {
  template: '<div>stub button</div>'
})

vi.mock('firebase/auth', () => ({
  sendPasswordResetEmail: vi.fn()
}))

describe('PasswordResetDialogコンポーネントのテスト', () => {
  let auth: AuthReturnType

  beforeEach(() => {
    auth = useAuth()
  })

  afterEach(() => {
    auth.authUser.value = null
  })

  it('パスワードリセット関数が呼び出され、正常に処理されるとダイアログが閉じる', async () => {
    auth.authUser.value = mockAuthUser
    const wrapper = await mountSuspended(PasswordResetDialog, { props: { bgColor: 'bg-blue-600' } })

    await wrapper.find(`[data-testId="clickSend"]`).trigger('click')
    await wait(10)

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)
  })
})
