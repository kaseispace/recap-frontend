// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Prompt from '@/components/Base/Card/Prompt.vue'

describe('Promptコンポーネントのテスト', () => {
  it('propsが正しく渡される', async () => {
    const wrapper = await mountSuspended(Prompt, {
      props: {
        title: '第1回目の振り返り',
        contents: mockPrompts,
        isSelected: false,
        bgColor: 'bg-blue-900'
      }
    })

    expect(wrapper.get(`[data-testId="propsBgColor"]`).classes()).toContain('bg-blue-900')
    expect(wrapper.get(`[data-testId="propsTitle"]`).text()).toBe('第1回目の振り返り')
    mockPrompts.forEach((contents) => {
      expect(wrapper.get(`[data-testId="propsContents"]`).text()).toContain(contents.content)
    })
  })
})
