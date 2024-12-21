export const useUserCourseApi = () => {
  const config = useRuntimeConfig()
  const studentCourses = useState<StudentCourse[] | null>('studentCourses', () => null)
  const currentStudentCourse = useState<StudentCourse | null>('currentStudentCourse', () => null)
  const isStudentCourseLoading = useState<boolean>('isStudentCourseLoading', () => true)

  const getJoinedCourses = async (idToken: string): Promise<StudentCourse[]> => {
    const data = await $fetch<StudentCourse[]>(`${config.public.backendUrl}/user_courses`, {
      headers: { Authorization: `Bearer ${idToken}` }
    })
    return data
  }

  const getJoinedCourse = async (courseUuid: string, idToken: string): Promise<StudentCourse | null> => {
    const data = await $fetch<StudentCourse | null>(`${config.public.backendUrl}/user_courses/${courseUuid}`, {
      headers: { Authorization: `Bearer ${idToken}` }
    })
    return data
  }

  const joinCourse = async (schoolId: number, courseCode: string, idToken: string): Promise<StudentCourse> => {
    const requestBody = { school_id: schoolId, course_code: courseCode }
    const data = await $fetch<StudentCourse>(`${config.public.backendUrl}/user_courses`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody
    })
    return data
  }

  const leaveCourse = async (courseUuid: string, idToken: string): Promise<void> => {
    await $fetch(`${config.public.backendUrl}/user_courses/${courseUuid}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${idToken}` }
    })
  }

  return {
    studentCourses,
    currentStudentCourse,
    isStudentCourseLoading,
    getJoinedCourses,
    getJoinedCourse,
    joinCourse,
    leaveCourse
  }
}
