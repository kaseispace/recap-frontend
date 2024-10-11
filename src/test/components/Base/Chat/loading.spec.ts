// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Loading from '@/components/Base/Chat/Loading.vue'

describe('Loadingコンポーネントのテスト', () => {
  it('propsで渡されたclassが、それぞれ適用される', async () => {
    const wrapper = await mountSuspended(Loading, {
      props: { bgColor: 'bg-slate-200', borderColor: 'border-t-slate-200' },
      global: { stubs: { Icon: true } }
    })

    expect(wrapper.find(`[data-testId="propsBgColor"]`).classes()).toContain('bg-slate-200')
    expect(wrapper.find(`[data-testId="propsBorderColor"]`).classes()).toContain('border-t-slate-200')
  })
})
