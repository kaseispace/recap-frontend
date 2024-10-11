// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Button from '@/components/Base/Button/index.vue'

describe('Buttonコンポーネントのテスト', () => {
  it('propsで値が渡された場合、正しく値が表示される', async () => {
    const wrapper = await mountSuspended(Button, { props: { text: 'キャンセル', buttonType: 'none' } })

    expect(wrapper.text()).toBe('キャンセル')
  })

  it('propsでisEnabledにtrueが渡された場合、ボタンをクリックできない', async () => {
    const wrapper = await mountSuspended(Button, { props: { buttonType: 'pagination', isEnabled: true } })

    expect(wrapper.attributes().disabled).toBe('')
  })

  it('propsでisEnabledにfalseが渡された場合、ボタンをクリックできる', async () => {
    const wrapper = await mountSuspended(Button, { props: { buttonType: 'pagination', isEnabled: false } })

    expect(wrapper.attributes().disabled).toBeUndefined()
  })
})
