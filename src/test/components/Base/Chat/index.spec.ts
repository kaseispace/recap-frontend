// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Chat from '@/components/Base/Chat/index.vue'
import Button from '@/components/Base/Button/index.vue'

describe('Chatコンポーネントのテスト', () => {
  it('propsが正しく渡される', async () => {
    const wrapper = await mountSuspended(Chat, {
      props: { title: 'テストチャット', bgColor: 'bg-cyan-800', isExpanded: false }
    })

    expect(wrapper.get('span').text()).toBe('テストチャット')
    expect(wrapper.find(`[data-testId="propsBgColor"]`).classes()).toContain('bg-cyan-800')
    expect(wrapper.find(`[data-testId="propsIsExpanded"]`).classes()).toEqual(
      expect.arrayContaining(['h-[570px]', 'w-[370px]', 'max-w-[80vw]'])
    )
    expect(wrapper.find(`[data-testId="propsIsExpanded"]`).classes()).not.toEqual(
      expect.arrayContaining(['h-[90vh]', 'w-[90vw]', 'max-w-screen-xl'])
    )
  })

  it('iconスロットにButtonコンポーネントを渡すと、正しくレンダリングされる', async () => {
    const wrapper = await mountSuspended(Chat, {
      props: { title: 'テストチャット', bgColor: 'bg-cyan-800', isExpanded: false },
      slots: {
        icon: () => h(Button, { buttonType: 'circle' })
      }
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })
})
