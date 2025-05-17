// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ForgotPasswordPage from '@/pages/forgotpassword.vue'
import { wait } from '@/test/mocks/index'

vi.mock('firebase/auth', () => ({
  sendPasswordResetEmail: vi.fn()
}))

describe('forgotpasswordページのテスト', () => {
  it('無効なメールアドレスでエラーメッセージが表示される', async () => {
    const wrapper = await mountSuspended(ForgotPasswordPage)

    await wrapper.get('form').trigger('submit')

    await wait(10)

    expect(wrapper.find(`[data-testId="errorEmail"]`).exists()).toBe(true)
  })

  it('パスワードリセットのためのメールが送信される', async () => {
    const wrapper = await mountSuspended(ForgotPasswordPage)

    await wrapper.get(`[data-testId="textInput"]`).setValue('test@example.com')
    await wrapper.get('form').trigger('submit')

    await wait(10)

    expect(wrapper.find(`[data-testId="emailSent"]`).text()).toBe('再設定用URLを記載したメールを送信しました')
  })
})
