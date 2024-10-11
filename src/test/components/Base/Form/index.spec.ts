// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Form from '@/components/Base/Form/index.vue'

describe('Formコンポーネントのテスト', () => {
  it('propsで値が渡された場合、正しく値が表示される', async () => {
    const wrapper = await mountSuspended(Form, {
      props: { title: 'ログイン' }
    })

    expect(wrapper.find('h2').text()).toBe('ログイン')
  })
})
