// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Menu from '@/components/Base/Menu/index.vue'

describe('Menuコンポーネントのテスト', () => {
  it('propsからselectedTextに値が渡されなかった場合、デフォルト値が表示される', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: { selectedText: '', menuArray: DAYS_OF_THE_WEEK }
    })

    expect(wrapper.get('span').text()).toBe('選択してください')
  })

  it('アイコンを1回クリックした場合、メニューリストが表示される', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: { selectedText: '', menuArray: DAYS_OF_THE_WEEK }
    })

    await wrapper.get(`[data-testId="clickIcon"]`).trigger('click')
    await wrapper.vm.$nextTick()

    const menu = wrapper.find(`[data-testId="invisible"]`)

    expect((menu.element as HTMLElement).style.display).not.toBe('none')
  })

  it('propsから渡されたdayOfTheWeekが、メニューリスト内に表示される', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: { selectedText: '', menuArray: DAYS_OF_THE_WEEK }
    })

    await wrapper.get(`[data-testId="clickIcon"]`).trigger('click')

    dayOfTheWeek.forEach((day) => {
      expect(wrapper.find(`[data-testId="invisible"]`).text()).toContain(day.text)
    })
  })

  it('メニューリストから「月曜日」を選択した場合、emitが実行され、値が正しく渡されている', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: { selectedText: '', menuArray: DAYS_OF_THE_WEEK }
    })

    await wrapper.get(`[data-testId="clickIcon"]`).trigger('click')
    await wrapper.find(`[data-testId="dateIndex-0"]`).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).toHaveProperty('selectMenu')
    expect(wrapper.emitted().selectMenu).toEqual([[{ value: 1, text: '月曜日' }]])
  })
})
