// @vitest-environment nuxt
import { mockComponent, mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import NavIcon from '@/components/Base/Layout/NavIcon.vue'

mockComponent('Icon', {
  template: '<div>stub icon</div>'
})

mockNuxtImport('useRoute', () => {
  return () => ({
    name: 'teacher'
  })
})

describe('NavIconコンポーネントのテスト', () => {
  it('propsで値が渡された場合、正しく値が適用される', async () => {
    const wrapper = await mountSuspended(NavIcon, {
      props: {
        iconName: 'fluent-mdl2:home',
        pathName: 'teacher',
        activeBg: 'bg-blue-600/40 hover:bg-blue-600/40',
        inactiveBg: 'hover:bg-blue-600/10'
      }
    })

    const navIconHref = wrapper.get(`[data-testId="link"]`).attributes('href')

    expect(navIconHref).toBe('/teacher')
    expect(wrapper.get(`[data-testId="propsBgColor"]`).classes()).toEqual(
      expect.arrayContaining(['bg-blue-600/40', 'hover:bg-blue-600/40'])
    )
    expect(wrapper.get(`[data-testId="icon"]`).attributes().name).toBe('fluent-mdl2:home')
  })

  it('現在のページとpropsで渡されたpathNameが異なる場合、inactiveBgが適用される', async () => {
    const wrapper = await mountSuspended(NavIcon, {
      props: {
        iconName: 'fluent-mdl2:home',
        pathName: 'index',
        activeBg: 'bg-blue-600/40 hover:bg-blue-600/40',
        inactiveBg: 'hover:bg-blue-600/10'
      }
    })

    expect(wrapper.get(`[data-testId="propsBgColor"]`).attributes().class).toContain('hover:bg-blue-600/10')
    expect(wrapper.get(`[data-testId="propsBgColor"]`).classes()).not.toEqual(
      expect.arrayContaining(['bg-blue-600/40', 'hover:bg-blue-600/40'])
    )
  })
})
