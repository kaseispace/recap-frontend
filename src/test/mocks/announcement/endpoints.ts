import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { readBody } from 'h3'
import { emptyDataUUID, dataUUID } from '@/test/mocks/index'
import { mockAnnouncementsData } from '@/test/mocks/announcement'

const config = useRuntimeConfig()

export const registerAnnouncementEndpoints = () => {
  registerEndpoint(`${config.public.devBackendUrl}/announcements/student_announcements?uuid=${emptyDataUUID}`, {
    method: 'GET',
    handler: () => {
      return []
    }
  })

  registerEndpoint(`${config.public.devBackendUrl}/announcements/student_announcements?uuid=${dataUUID}`, {
    method: 'GET',
    handler: () => {
      return mockAnnouncementsData
    }
  })

  registerEndpoint(`${config.public.devBackendUrl}/announcements/teacher_announcements?uuid=${emptyDataUUID}`, {
    method: 'GET',
    handler: () => {
      return []
    }
  })

  registerEndpoint(`${config.public.devBackendUrl}/announcements/teacher_announcements?uuid=${dataUUID}`, {
    method: 'GET',
    handler: () => {
      return mockAnnouncementsData
    }
  })

  // お知らせの作成
  registerEndpoint(`${config.public.devBackendUrl}/announcements`, {
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
  registerEndpoint(`${config.public.devBackendUrl}/announcements/5`, {
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
  registerEndpoint(`${config.public.devBackendUrl}/announcements/1`, {
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
