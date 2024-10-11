// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import CreateAnnouncementCard from '@/components/Domain/Teacher/course/CreateAnnouncementCard.vue'
import { mockAuthUser, dataUUID, wait } from '@/test/mocks/index'
import { registerAnnouncementEndpoints } from '@/test/mocks/announcement/endpoints'
import { mockAnnouncementsData } from '@/test/mocks/announcement/index'

mockComponent('BaseButton', {
  template: '<button>stub button</button>'
})

describe('CreateAnnouncementCardコンポーネントのテスト', () => {
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

  it('ダイアログがクリックで正しく開閉する', async () => {
    const wrapper = await mountSuspended(CreateAnnouncementCard)

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)

    await wrapper.get(`[data-testId="button"]`).trigger('click')

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(true)

    await wrapper.find(`[data-testId="clickCancel"]`).trigger('click')

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)
  })

  describe('バリデーション', () => {
    it('テキストエリアが空の場合、エラーメッセージが表示される', async () => {
      const wrapper = await mountSuspended(CreateAnnouncementCard)

      await wrapper.get(`[data-testId="button"]`).trigger('click')

      await wrapper.find(`[data-testId="clickPost"]`).trigger('click')
      await wait(50)

      expect(wrapper.find(`[data-testId="errorContent"]`).text()).toBe('必須項目です')
    })

    it('テキストエリアが空でない場合、エラーメッセージが表示されず、お知らせを投稿できる', async () => {
      auth.authUser.value = mockAuthUser
      course.courseUuid.value = dataUUID
      announcement.announcements.value = mockAnnouncementsData
      const wrapper = await mountSuspended(CreateAnnouncementCard)

      await wrapper.get(`[data-testId="button"]`).trigger('click')
      await wrapper.find(`[data-testId="content"]`).setValue('来週の授業は休校です。')

      await wrapper.find(`[data-testId="clickPost"]`).trigger('click')
      await wait(50)

      expect(wrapper.find(`[data-testId="errorContent"]`).exists()).toBe(false)
      expect(announcement.announcements.value[0].content).toBe('来週の授業は休校です。')
    })
  })
})
