// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Chat from '@/components/Base/Chat/index.vue'

describe('Chatコンポーネントのテスト', () => {
  it('propsでtitleに「テストチャット」が渡された場合、正しく表示され、背景色が「bg-cyan-800」で表示される', async () => {
    const wrapper = await mountSuspended(Chat, {
      props: { title: 'テストチャット', bgColor: 'bg-cyan-800' }
    })

    expect(wrapper.get('span').text()).toBe('テストチャット')
    expect(wrapper.find(`[data-testId="propsBgColor"]`).classes()).toContain('bg-cyan-800')
  })
})
