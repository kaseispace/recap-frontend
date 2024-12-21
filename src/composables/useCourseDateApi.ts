export const useCourseDateApi = () => {
  const config = useRuntimeConfig()
  const courseDates = useState<CourseDate[] | null>('courseDates', () => null)
  const todayCourseDate = useState<CourseDate | null>('todayCourseDates', () => null)

  const getTeacherCourseDate = async (uuid: string, idToken: string): Promise<CourseDate[]> => {
    const data = await $fetch<CourseDate[]>(
      `${config.public.backendUrl}/course_dates/teacher_course_dates?uuid=${uuid}`,
      {
        headers: { Authorization: `Bearer ${idToken}` }
      }
    )
    return data
  }

  const getStudentCourseDate = async (uuid: string, idToken: string): Promise<CourseDate[]> => {
    const data = await $fetch<CourseDate[]>(
      `${config.public.backendUrl}/course_dates/student_course_dates?uuid=${uuid}`,
      {
        headers: { Authorization: `Bearer ${idToken}` }
      }
    )
    return data
  }

  const createCourseDate = async (
    uuid: string,
    courseNumber: string,
    courseDate: string,
    idToken: string
  ): Promise<CourseDate> => {
    const requestBody = { uuid, course_date: { course_number: courseNumber, course_date: courseDate } }
    const data = await $fetch<CourseDate>(`${config.public.backendUrl}/course_dates`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody
    })
    return data
  }

  const updateCourseDate = async (
    courseDateId: number,
    courseNumber: string,
    courseDate: string,
    idToken: string
  ): Promise<CourseDate> => {
    const requestBody = { course_date: { course_number: courseNumber, course_date: courseDate } }
    const data = await $fetch<CourseDate>(`${config.public.backendUrl}/course_dates/${courseDateId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody
    })
    return data
  }

  const updateReflectionStatus = async (courseDateId: number, idToken: string): Promise<CourseDate> => {
    const data = await $fetch<CourseDate>(
      `${config.public.backendUrl}/course_dates/${courseDateId}/reflection_status`,
      {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${idToken}` }
      }
    )
    return data
  }

  const deleteCourseDate = async (courseDateId: number, idToken: string): Promise<void> => {
    await $fetch(`${config.public.backendUrl}/course_dates/${courseDateId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${idToken}` }
    })
  }

  return {
    courseDates,
    todayCourseDate,
    getTeacherCourseDate,
    getStudentCourseDate,
    createCourseDate,
    updateCourseDate,
    updateReflectionStatus,
    deleteCourseDate
  }
}
