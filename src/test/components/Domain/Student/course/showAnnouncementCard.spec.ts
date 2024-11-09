// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import ShowAnnouncementCard from '@/components/Domain/Student/course/ShowAnnouncementCard.vue'
import { MOCK_AUTH_USER, MOCK_EMPTY_UUID, MOCK_UUID, wait } from '@/test/mocks/index'
import { registerAnnouncementEndpoints } from '@/test/mocks/announcement/endpoints'

mockComponent('BaseEmpty', {
  template: '<div data-testId="empty">stub empty announcement</div>'
})

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
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_EMPTY_UUID
      const wrapper = await mountSuspended(ShowAnnouncementCard)

      await wait(10)

      expect(wrapper.find(`[data-testId="empty"]`).exists()).toBe(true)
    })
  })

  describe('お知らせが存在する場合', () => {
    it('各お知らせカードにお知らせ内容が表示される', async () => {
      auth.authUser.value = MOCK_AUTH_USER
      course.courseUuid.value = MOCK_UUID
      const wrapper = await mountSuspended(ShowAnnouncementCard)

      await wait(10)

      expect(announcement.announcements.value).toBeTruthy()

      if (!announcement.announcements.value) return

      for (let i = 0; i < announcement.announcements.value.length; i++) {
        const announcementCard = wrapper.find(`[data-testId="announcement-${i}"]`).text()
        expect(announcementCard).toContain(announcement.announcements.value[i].content)
      }
    })
  })
})
