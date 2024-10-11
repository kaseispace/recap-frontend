// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import ShowAnnouncementCard from '@/components/Domain/Teacher/course/ShowAnnouncementCard.vue'
import { mockAuthUser, emptyDataUUID, dataUUID, wait } from '@/test/mocks/index'
import { registerAnnouncementEndpoints } from '@/test/mocks/announcement/endpoints'

mockComponent('BaseEmpty', {
  template: '<div data-testId="empty">stub empty announcement</div>'
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    handleAnnouncementEditOrDeleteAction: (actionId: number, announcement: Announcement) => void
  }
}

describe('ShowAnnouncementCardコンポーネントのテスト', () => {
  let auth: AuthReturnType
  let course: CourseApiReturnType
  let announcement: AnnouncementApiReturnType
  registerAnnouncementEndpoints()

  beforeEach(() => {
    auth = useAuth()
    course = useCourseApi()
    announcement = useAnnouncementApi()
  })

  afterEach(() => {
    auth.authUser.value = null
    announcement.announcements.value = null
  })

  describe('お知らせが存在しない場合', () => {
    it('お知らせがないことを示すコンポーネントが表示される', async () => {
      auth.authUser.value = mockAuthUser
      course.courseUuid.value = emptyDataUUID
      const wrapper = await mountSuspended(ShowAnnouncementCard)

      await wait(10)

      expect(wrapper.find(`[data-testId="empty"]`).exists()).toBe(true)
    })
  })

  describe('お知らせが存在する場合', () => {
    it('各お知らせカードにお知らせ内容が表示される', async () => {
      auth.authUser.value = mockAuthUser
      course.courseUuid.value = dataUUID
      const wrapper = await mountSuspended(ShowAnnouncementCard)

      await wait(10)

      expect(announcement.announcements.value).toBeTruthy()

      if (!announcement.announcements.value) return

      for (let i = 0; i < announcement.announcements.value.length; i++) {
        const announcementCard = wrapper.find(`[data-testId="announcement-${i}"]`).text()
        expect(announcementCard).toContain(announcement.announcements.value[i].content)
      }
    })

    it('編集用ダイアログが表示され、お知らせの編集ができる', async () => {
      auth.authUser.value = mockAuthUser
      course.courseUuid.value = dataUUID
      const wrapper = await mountSuspended(ShowAnnouncementCard)

      await wait(10)

      expect(announcement.announcements.value).toBeTruthy()

      if (!announcement.announcements.value) return

      wrapper.vm.handleAnnouncementEditOrDeleteAction(1, announcement.announcements.value[4])

      await wrapper.vm.$nextTick()

      expect(wrapper.find(`[data-testId="editDialog"]`).exists()).toBe(true)

      await wrapper
        .find(`[data-testId="content"]`)
        .setValue('課題の提出期限を来週の月曜日に延長しました。間違わないように注意してください。')
      await wrapper.find(`[data-testId="clickEdit"]`).trigger('click')
      await wait(100)

      expect(announcement.announcements.value[0].content).toBe(
        '課題の提出期限を来週の月曜日に延長しました。間違わないように注意してください。'
      )
    })

    it('削除用ダイアログが表示され、お知らせを削除できる', async () => {
      auth.authUser.value = mockAuthUser
      course.courseUuid.value = dataUUID
      const wrapper = await mountSuspended(ShowAnnouncementCard)

      await wait(10)

      expect(announcement.announcements.value).toBeTruthy()

      if (!announcement.announcements.value) return

      wrapper.vm.handleAnnouncementEditOrDeleteAction(2, announcement.announcements.value[0])

      await wrapper.vm.$nextTick()

      expect(wrapper.find(`[data-testId="deleteDialog"]`).exists()).toBe(true)

      await wrapper.find(`[data-testId="clickDelete"]`).trigger('click')
      await wait(100)

      expect(announcement.announcements.value.length).toBe(4)
    })
  })
})
