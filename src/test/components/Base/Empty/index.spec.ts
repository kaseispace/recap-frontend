// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import Empty from '@/components/Base/Empty/index.vue'

mockComponent('NuxtImg', {
  template: '<div>stub img</div>'
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    imageLoaded: Ref<boolean>
  }
}

describe('Emptyコンポーネントのテスト', () => {
  it('propsが正しく渡される', async () => {
    const wrapper = await mountSuspended(Empty, {
      props: {
        imgPath: 't-empty-courses_pzkwxr.png',
        imgAlt: '授業がまだ存在しません',
        explanation1: 'まだ授業に参加していません',
        explanation2: '授業を追加して、振り返りを始めてみませんか？'
      }
    })

    wrapper.vm.imageLoaded.value = true

    await wrapper.vm.$nextTick()

    expect(wrapper.get(`[data-testId="propsImg"]`).attributes('alt')).toBe('授業がまだ存在しません')
    expect(wrapper.get(`[data-testId="propsImg"]`).attributes('src')).toBe('t-empty-courses_pzkwxr.png')
    expect(wrapper.get(`[data-testId="propsExplanation"]`).text()).toContain('まだ授業に参加していません')
    expect(wrapper.get(`[data-testId="propsExplanation"]`).text()).toContain(
      '授業を追加して、振り返りを始めてみませんか？'
    )
  })
})
