// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import SideBar from '@/components/Base/Layout/SideBar.vue'

mockComponent('BaseTooltip', {
  template: '<div>stub tool tip</div>'
})

mockComponent('Icon', {
  template: '<div>stub icon</div>'
})

describe('SideBarコンポーネントのテスト', () => {
  it('props指定したbgColorが適用される', async () => {
    const wrapper = await mountSuspended(SideBar, {
      props: {
        bgColor: 'hover:bg-cyan-600/10'
      }
    })

    expect(wrapper.get(`[data-testId="propsBgColor"]`).attributes().class).toContain('hover:bg-cyan-600/10')
    expect(wrapper.get(`[data-testId="icon"]`).attributes().name).toBe('material-symbols:logout-sharp')
  })
})
