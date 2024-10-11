// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppBar from '@/components/Base/Layout/AppBar.vue'

describe('AppBarコンポーネントのテスト', () => {
  it('propsで値が渡された場合、正しく値が表示される', async () => {
    const wrapper = await mountSuspended(AppBar, {
      props: { schoolName: '東京大学', titleFont: 'font-bold' }
    })

    expect(wrapper.get(`[data-testId="schoolName"]`).text()).toBe('東京大学')
    expect(wrapper.get(`[data-testId="schoolName"]`).classes()).toContain('font-bold')
    expect(wrapper.get(`[data-testId="schoolName"]`).classes()).not.toEqual(
      expect.arrayContaining(['text-lg', 'font-medium'])
    )
  })

  it('propsでtitleFontを渡さなかった場合デフォルト値が適用される', async () => {
    const wrapper = await mountSuspended(AppBar, {
      props: { schoolName: '東京大学' }
    })

    expect(wrapper.get(`[data-testId="schoolName"]`).classes()).toEqual(
      expect.arrayContaining(['text-lg', 'font-medium'])
    )
  })
})
