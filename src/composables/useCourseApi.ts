export const useCourseApi = () => {
  const config = useRuntimeConfig()
  const teacherCourses = useState<Course[] | null>('teacherCourses', () => null)
  const currentCourse = useState<Course | null>('currentCourse', () => null)
  const courseUuid = useState<string | null>('courseUuid', () => null)
  const courseCode = useState<string | null>('courseCode', () => null)
  const joinedUsers = useState<SimplifiedUser[] | null>('joinedUsers', () => null)
  const isTeacherCourseLoading = useState<boolean>('isTeacherCourseLoading', () => true)

  const getCourse = async (idToken: string): Promise<Course[]> => {
    const data = await $fetch<Course[]>(`${config.public.backendUrl}/courses`, {
      headers: { Authorization: `Bearer ${idToken}` }
    })
    return data
  }

  // 見つからない場合はnullを返す
  const getCourseByUuid = async (courseUuid: string, idToken: string): Promise<Course | null> => {
    const data = await $fetch<Course | null>(`${config.public.backendUrl}/courses/${courseUuid}`, {
      headers: { Authorization: `Bearer ${idToken}` }
    })
    return data
  }

  const getJoinedUsers = async (courseUuid: string, idToken: string): Promise<SimplifiedUser[]> => {
    const data = await $fetch<SimplifiedUser[]>(`${config.public.backendUrl}/courses/${courseUuid}/joined_users`, {
      headers: { Authorization: `Bearer ${idToken}` }
    })
    return data
  }

  const createCourse = async (
    schoolId: number,
    name: string,
    teacherName: string,
    dayOfWeek: string,
    courseTime: string,
    idToken: string
  ): Promise<Course> => {
    const requestBody = {
      school_id: schoolId,
      name,
      teacher_name: teacherName,
      day_of_week: dayOfWeek,
      course_time: courseTime
    }
    const data = await $fetch<Course>(`${config.public.backendUrl}/courses`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody
    })
    return data
  }

  const updateCourse = async (
    courseUuid: string,
    name: string,
    teacherName: string,
    dayOfWeek: string,
    courseTime: string,
    idToken: string
  ): Promise<Course> => {
    const requestBody = {
      name,
      teacher_name: teacherName,
      day_of_week: dayOfWeek,
      course_time: courseTime
    }
    const data = await $fetch<Course>(`${config.public.backendUrl}/courses/${courseUuid}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody
    })
    return data
  }

  // 教師が作成した授業を削除（授業に参加していたユーザーの関連も削除）
  const deleteCourse = async (courseUuid: string, idToken: string): Promise<void> => {
    await $fetch(`${config.public.backendUrl}/courses/${courseUuid}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${idToken}` }
    })
  }

  return {
    teacherCourses,
    currentCourse,
    courseUuid,
    courseCode,
    joinedUsers,
    isTeacherCourseLoading,
    createCourse,
    getCourse,
    getCourseByUuid,
    getJoinedUsers,
    updateCourse,
    deleteCourse
  }
}
