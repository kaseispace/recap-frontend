// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import History from '@/components/Base/Card/History.vue'

describe('Historyコンポーネントのテスト', () => {
  it('propsが正しく渡される', async () => {
    const wrapper = await mountSuspended(History, {
      props: { title: '活動履歴', bgColor: 'bg-gray-100' }
    })

    expect(wrapper.find('h1').text()).toBe('活動履歴')
    expect(wrapper.find(`[data-testId="propsBgColor"]`).classes()).toContain('bg-gray-100')
  })
})
