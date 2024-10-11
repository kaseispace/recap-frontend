// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Overlay from '@/components/Base/Dialog/Overlay.vue'
import Dialog from '@/components/Base/Dialog/index.vue'

describe('Overlayコンポーネントのテスト', () => {
  it('オプショナルなpropsであるdialogTypeに「right」が渡された場合、classにjustify-endが適用される', async () => {
    const wrapper = await mountSuspended(Overlay, {
      props: { dialogType: 'right' }
    })

    expect(wrapper.find('div').classes()).toContain('justify-end')
  })

  it('オプショナルなpropsであるdialogTypeに「left」が渡された場合、classにjustify-startが適用される', async () => {
    const wrapper = await mountSuspended(Overlay, {
      props: { dialogType: 'left' }
    })

    expect(wrapper.find('div').classes()).toContain('justify-start')
  })

  it('defaultスロットにDialogコンポーネントを渡すと、正しくレンダリングされる', async () => {
    const wrapper = await mountSuspended(Overlay, {
      slots: {
        default: () => h(Dialog, { wide: 'large', title: 'クラスを作成' })
      }
    })

    expect(wrapper.find(`[data-testId="propsWide"]`).exists()).toBe(true)
  })
})
