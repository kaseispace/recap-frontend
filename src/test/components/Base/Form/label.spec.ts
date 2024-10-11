// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Label from '@/components/Base/Form/Label.vue'

describe('Labelコンポーネントのテスト', () => {
  it('propsで値が渡された場合、正しく値が表示される', async () => {
    const wrapper = await mountSuspended(Label, {
      props: { text: 'メールアドレス' }
    })

    expect(wrapper.get('label').text()).toBe('メールアドレス')
  })

  it('オプショナルなpropsであるinputForに「email」が渡された場合、for属性に「email」が設定される', async () => {
    const wrapper = await mountSuspended(Label, {
      props: { text: 'メールアドレス', inputFor: 'email' }
    })

    expect(wrapper.attributes().for).toBe('email')
  })
})
