// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Title from '@/components/Base/Title/index.vue'

describe('Titleコンポーネントのテスト', () => {
  it('propsで値が渡された場合、正しく値が表示される', async () => {
    const wrapper = await mountSuspended(Title, {
      props: { text: '受講中の授業一覧' }
    })

    expect(wrapper.text()).toBe('受講中の授業一覧')
  })
})
