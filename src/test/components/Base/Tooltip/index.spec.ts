// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Tooltip from '@/components/Base/Tooltip/index.vue'

describe('Tooltipコンポーネントのテスト', () => {
  it('propsで値が渡された場合、正しく値が表示される', async () => {
    const wrapper = await mountSuspended(Tooltip, {
      props: { message: 'ログアウト' }
    })

    expect(wrapper.text()).toBe('ログアウト')
  })
})
