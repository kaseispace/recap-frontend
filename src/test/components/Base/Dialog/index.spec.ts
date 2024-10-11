// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Dialog from '@/components/Base/Dialog/index.vue'
import Button from '@/components/Base/Button/index.vue'

describe('Dialogコンポーネントのテスト', () => {
  it('propsでwideに「small」が渡された場合、横幅の最大値が450pxに設定される', async () => {
    const wrapper = await mountSuspended(Dialog, {
      props: { wide: 'small' }
    })

    expect(wrapper.get(`[data-testId="propsWide"]`).classes()).toContain('max-w-[450px]')
  })

  it('propsでwideに「large」が渡された場合、横幅の最大値が750pxに設定される', async () => {
    const wrapper = await mountSuspended(Dialog, {
      props: { wide: 'large' }
    })

    expect(wrapper.get(`[data-testId="propsWide"]`).classes()).toContain('max-w-[700px]')
  })

  it('オプショナルなpropsであるtitleに「クラスを作成」が渡された場合、「クラスを作成」が表示される', async () => {
    const wrapper = await mountSuspended(Dialog, {
      props: { wide: 'large', title: 'クラスを作成' }
    })

    expect(wrapper.find(`[data-testId="propsTitle"]`).text()).toBe('クラスを作成')
  })

  it('defaultスロットにButtonコンポーネントを渡すと、正しくレンダリングされる', async () => {
    const wrapper = await mountSuspended(Dialog, {
      props: { wide: 'large', title: 'クラスを作成' },
      slots: {
        default: () => h(Button, { text: 'キャンセル', buttonType: 'none' })
      }
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })
})
