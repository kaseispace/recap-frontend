export const useAnnouncementApi = () => {
  const config = useRuntimeConfig()
  const announcements = useState<Announcement[] | null>('announcement', () => null)

  const getTeacherAnnouncements = async (uuid: string, idToken: string): Promise<Announcement[]> => {
    const data = await $fetch<Announcement[]>(
      `${config.public.devBackendUrl}/announcements/teacher_announcements?uuid=${uuid}`,
      {
        headers: { Authorization: `Bearer ${idToken}` },
      },
    )
    return data
  }

  const getStudentAnnouncements = async (uuid: string, idToken: string): Promise<Announcement[]> => {
    const data = await $fetch<Announcement[]>(
      `${config.public.devBackendUrl}/announcements/student_announcements?uuid=${uuid}`,
      {
        headers: { Authorization: `Bearer ${idToken}` },
      },
    )
    return data
  }

  const createAnnouncement = async (courseUuid: string, content: string, idToken: string): Promise<Announcement> => {
    const requestBody = { uuid: courseUuid, content }
    const data = await $fetch<Announcement>(`${config.public.devBackendUrl}/announcements`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody,
    })
    return data
  }

  const updateAnnouncement = async (
    announcementId: number,
    content: string,
    idToken: string,
  ): Promise<Announcement> => {
    const requestBody = { content }
    const data = await $fetch<Announcement>(`${config.public.devBackendUrl}/announcements/${announcementId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody,
    })
    return data
  }

  const deleteAnnouncement = async (announcementId: number, idToken: string): Promise<void> => {
    await $fetch(`${config.public.devBackendUrl}/announcements/${announcementId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${idToken}` },
    })
  }

  return {
    announcements,
    getTeacherAnnouncements,
    getStudentAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
  }
}
