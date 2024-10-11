// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Bubble from '@/components/Base/Chat/Bubble.vue'

describe('Bubbleコンポーネントのテスト', () => {
  it('propsが正しく渡される', async () => {
    const wrapper = await mountSuspended(Bubble, {
      props: { message: 'テスト開始', messageType: 'user', bgColor: 'bg-cyan-800' }
    })

    expect(wrapper.get('span').text()).toBe('テスト開始')
    expect(wrapper.find(`[data-testId="propsBgColor"]`).classes()).toContain('bg-cyan-800')
  })

  it('propsでmessageTypeに「user」が渡された場合、user用のclassが適用される', async () => {
    const wrapper = await mountSuspended(Bubble, {
      props: { message: 'テスト開始', messageType: 'user', bgColor: 'bg-cyan-800' }
    })

    expect(wrapper.get('span').classes()).toContain('text-white')
    expect(wrapper.find(`[data-testId="propsBorderColor"]`).classes()).toEqual(
      expect.arrayContaining(['right-[-10px]', '-rotate-12'])
    )
  })

  it('propsでmessageTypeに「bot」が渡された場合、bot用のclassが適用される', async () => {
    const wrapper = await mountSuspended(Bubble, {
      props: { message: 'テスト開始', messageType: 'bot', bgColor: 'bg-cyan-800' }
    })

    expect(wrapper.get('span').classes()).toContain('text-black')
    expect(wrapper.find(`[data-testId="propsBorderColor"]`).classes()).toEqual(
      expect.arrayContaining(['left-[-10px]', 'rotate-12'])
    )
  })
})
