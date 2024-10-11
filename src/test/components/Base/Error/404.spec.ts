// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import Error404 from '@/components/Base/Error/404.vue'

mockComponent('NuxtImg', {
  template: '<div>stub img</div>'
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    isImageLoaded: Ref<boolean>
  }
}

describe('Error404コンポーネントのテスト', () => {
  it('エラーメッセージが表示される', async () => {
    const wrapper = await mountSuspended(Error404, {
      props: { imgPath: '404_yvgigj.png' }
    })

    wrapper.vm.isImageLoaded.value = true

    await wrapper.vm.$nextTick()

    expect(wrapper.get(`[data-testId="propsImg"]`).attributes('src')).toBe('404_yvgigj.png')
    expect(wrapper.emitted('imageLoad')).toHaveLength(1)
    expect(wrapper.get(`[data-testId="errorMsg"]`).text()).toBe('お探しのページが見つかりませんでした')
  })
})
