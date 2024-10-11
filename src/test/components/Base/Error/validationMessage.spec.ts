// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ValidationMessage from '@/components/Base/Error/ValidationMessage.vue'

describe('ValidationMessageコンポーネントのテスト', () => {
  it('propsで値が渡された場合、正しく値が表示される', async () => {
    const wrapper = await mountSuspended(ValidationMessage, {
      props: { text: '必須項目です' }
    })

    expect(wrapper.get('p').text()).toBe('必須項目です')
  })
})
