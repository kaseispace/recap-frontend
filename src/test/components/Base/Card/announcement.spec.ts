// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Announcement from '@/components/Base/Card/Announcement.vue'

describe('Announcementコンポーネントのテスト', () => {
  it('propsが正しく渡される', async () => {
    const wrapper = await mountSuspended(Announcement, {
      props: {
        content: '来週の授業は休校です',
        dateTime: new Date().toISOString(),
        isEdited: false
      }
    })

    expect(wrapper.get(`[data-testId="timeAgo"]`).text()).toBe('今')
    expect(wrapper.get(`[data-testId="propsContent"]`).text()).toBe('来週の授業は休校です')
    expect(wrapper.find(`[data-testId="propsIsEdited"]`).exists()).toBe(false)
  })

  it('dateTimeに1日前の日付を渡すと、「昨日」と表示される', async () => {
    const wrapper = await mountSuspended(Announcement, {
      props: {
        content: '来週の授業は休校です',
        dateTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isEdited: true
      }
    })

    expect(wrapper.get(`[data-testId="timeAgo"]`).text()).toBe('昨日')
    expect(wrapper.find(`[data-testId="propsIsEdited"]`).exists()).toBe(true)
  })
})
