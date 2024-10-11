// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Loading from '@/components/Base/Loading/index.vue'

describe('Loadingコンポーネントのテスト', () => {
  it('propsで値が渡された場合、正しく値が適用される', async () => {
    const wrapper = await mountSuspended(Loading, {
      props: { borderColor: 'border-t-slate-200' }
    })

    expect(wrapper.find(`[data-testId="propsBorderColor"]`).classes()).toContain('border-t-slate-200')
  })

  it('propsでiconSizeに「small」が渡された場合、smallが適用される', async () => {
    const wrapper = await mountSuspended(Loading, {
      props: { iconSize: 'small', borderColor: 'border-t-slate-200' }
    })

    expect(wrapper.find(`[data-testId="propsBorderColor"]`).classes()).toContain('size-8')
  })
})
