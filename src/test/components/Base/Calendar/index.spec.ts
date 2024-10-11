// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Calendar from '@/components/Base/Calendar/index.vue'

describe('Calendarコンポーネントのテスト', () => {
  it('propsで値が渡されなかった場合、デフォルト値が表示される', async () => {
    const wrapper = await mountSuspended(Calendar, { global: { stubs: { Icon: true } } })

    expect(wrapper.find('span').text()).toBe('選択してください')
  })

  it('propsで値が渡された場合、正しく値が表示される', async () => {
    const wrapper = await mountSuspended(Calendar, {
      props: { courseDate: '2024/7/4' },
      global: { stubs: { Icon: true } }
    })

    expect(wrapper.find('span').text()).toBe('2024/7/4')
  })

  it('カレンダーアイコンをクリックした場合、カレンダーが表示される', async () => {
    const wrapper = await mountSuspended(Calendar, { global: { stubs: { Icon: true } } })
    await wrapper.get(`[data-testId="clickIcon"]`).trigger('click')

    expect(wrapper.find(`[data-testId="invisible"]`).exists()).toBe(true)
  })
})
