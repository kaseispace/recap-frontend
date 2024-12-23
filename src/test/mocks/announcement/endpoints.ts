import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { readBody } from 'h3'
import { MOCK_EMPTY_UUID, MOCK_UUID } from '@/test/mocks/index'
import { MOCK_ANNOUNCEMENTS } from '@/test/mocks/announcement'

const config = useRuntimeConfig()

export const registerAnnouncementEndpoints = () => {
  registerEndpoint(`${config.public.backendUrl}/announcements/student_announcements?uuid=${MOCK_EMPTY_UUID}`, {
    method: 'GET',
    handler: () => {
      return []
    }
  })

  registerEndpoint(`${config.public.backendUrl}/announcements/student_announcements?uuid=${MOCK_UUID}`, {
    method: 'GET',
    handler: () => {
      return MOCK_ANNOUNCEMENTS
    }
  })

  registerEndpoint(`${config.public.backendUrl}/announcements/teacher_announcements?uuid=${MOCK_EMPTY_UUID}`, {
    method: 'GET',
    handler: () => {
      return []
    }
  })

  registerEndpoint(`${config.public.backendUrl}/announcements/teacher_announcements?uuid=${MOCK_UUID}`, {
    method: 'GET',
    handler: () => {
      return MOCK_ANNOUNCEMENTS
    }
  })

  // お知らせの作成
  registerEndpoint(`${config.public.backendUrl}/announcements`, {
    method: 'POST',
    handler: async (event) => {
      const body = await readBody<Announcement>(event)
      return {
        id: 6,
        content: body.content,
        created_at: '2024-01-02T00:00:00+09:00',
        updated_at: '2024-01-02T00:00:00+09:00'
      }
    }
  })

  // お知らせの編集
  registerEndpoint(`${config.public.backendUrl}/announcements/5`, {
    method: 'PUT',
    handler: async (event) => {
      const announcement = useAnnouncementApi()
      const body = await readBody<Announcement>(event)
      if (announcement.announcements.value) {
        return {
          id: announcement.announcements.value[4].id,
          content: body.content,
          created_at: announcement.announcements.value[4].created_at,
          updated_at: '2024-01-02T00:00:00+09:00'
        }
      }
    }
  })

  // お知らせの削除
  registerEndpoint(`${config.public.backendUrl}/announcements/1`, {
    method: 'DELETE',
    handler: () => {
      const announcement = useAnnouncementApi()
      const deleteAnnouncement = announcement.announcements.value?.find(announcement => announcement.id === 1)
      if (deleteAnnouncement) {
        return {}
      }
    }
  })
}
