// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import SignupPage from '@/pages/signup.vue'

mockComponent('BaseForm', {
  template: '<div data-testId="signupForm">stub signup</div>'
})

mockComponent('BaseDialogOverlay', {
  template: '<div data-testId="overlay">stub overlay</div>'
})

describe('signupページのテスト', () => {
  it('新規登録フォームが表示される', async () => {
    const wrapper = await mountSuspended(SignupPage)

    expect(wrapper.find(`[data-testId="signupForm"]`).exists()).toBe(true)
  })

  it('読み込み画面が表示される', async () => {
    const wrapper = await mountSuspended(SignupPage)
    const loading = wrapper.find(`[data-testId="overlay"]`)

    expect((loading.element as HTMLElement).style.display).toBe('none')

    wrapper.vm.isLoading.value = true

    await wrapper.vm.$nextTick()

    expect((loading.element as HTMLElement).style.display).not.toBe('none')
  })
})
