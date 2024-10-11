// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Chips from '@/components/Base/Card/Chips.vue'

describe('Chipsコンポーネントのテスト', () => {
  it('propsでiconTypeに「calendar」が渡された場合、カレンダーアイコンが表示される', async () => {
    const wrapper = await mountSuspended(Chips, {
      props: { text: '月曜日', iconType: 'calendar' },
      global: { stubs: { Icon: true } }
    })

    expect(wrapper.find('p').text()).toBe('月曜日')
    expect(wrapper.find(`[data-testId="calendar"]`).exists()).toBe(true)
  })

  it('propsでiconTypeに「timetable」が渡された場合、タイムテーブルアイコンが表示される', async () => {
    const wrapper = await mountSuspended(Chips, {
      props: { text: '木曜日', iconType: 'timetable' },
      global: { stubs: { Icon: true } }
    })

    expect(wrapper.find('p').text()).toBe('木曜日')
    expect(wrapper.find(`[data-testId="timetable"]`).exists()).toBe(true)
  })
})
