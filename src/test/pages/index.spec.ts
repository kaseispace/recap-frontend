// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '@/pages/index.vue'

mockComponent('BaseForm', {
  template: '<div data-testId="loginForm">stub login</div>'
})

mockComponent('BaseDialogOverlay', {
  template: '<div data-testId="overlay">stub overlay</div>'
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    isLoading: Ref<boolean>
  }
}

describe('indexページのテスト', () => {
  it('ログインフォームが表示される', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.find(`[data-testId="loginForm"]`).exists()).toBe(true)
  })

  it('読み込み画面が表示される', async () => {
    const wrapper = await mountSuspended(IndexPage)

    const loading = wrapper.find(`[data-testId="overlay"]`)

    expect((loading.element as HTMLElement).style.display).toBe('none')

    wrapper.vm.isLoading.value = true

    await wrapper.vm.$nextTick()

    expect((loading.element as HTMLElement).style.display).not.toBe('none')
  })
})
