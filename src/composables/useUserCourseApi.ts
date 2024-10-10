export const useUserCourseApi = () => {
  const config = useRuntimeConfig()
  const studentCourses = useState<StudentCourse[] | null>('studentCourses', () => null)
  const currentStudentCourse = useState<StudentCourse | null>('currentStudentCourse', () => null)
  const isStudentCourseLoading = useState<boolean>('isStudentCourseLoading', () => true)

  const getJoinedCourses = async (idToken: string): Promise<StudentCourse[]> => {
    const data = await $fetch<StudentCourse[]>(`${config.public.devBackendUrl}/user_courses`, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
    return data
  }

  const getJoinedCourse = async (courseUuid: string, idToken: string): Promise<StudentCourse | null> => {
    const data = await $fetch<StudentCourse | null>(`${config.public.devBackendUrl}/user_courses/${courseUuid}`, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
    return data
  }

  // const joinCourse = async (schoolId: number, courseCode: string, idToken: string) => {
  //   const requestBody = { school_id: schoolId, course_code: courseCode }
  //   let statusCode = null
  //   const data = await useFetch(`${config.public.devBackendUrl}/user_courses`, {
  //     method: 'POST',
  //     headers: { Authorization: `Bearer ${idToken}` },
  //     body: requestBody,
  //     onResponse({ response }) {
  //       console.log(response.status)
  //       statusCode = response.status
  //     },
  //     transform: (course: StudentCourse) => {
  //       return course
  //     }
  //   })
  //   return { data, statusCode }
  // }

  const joinCourse = async (schoolId: number, courseCode: string, idToken: string): Promise<StudentCourse> => {
    const requestBody = { school_id: schoolId, course_code: courseCode }
    const data = await $fetch<StudentCourse>(`${config.public.devBackendUrl}/user_courses`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody,
    })
    return data
  }

  // 参加中の授業から、退出する
  const leaveCourse = async (courseUuid: string, idToken: string): Promise<void> => {
    await $fetch(`${config.public.devBackendUrl}/user_courses/${courseUuid}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${idToken}` },
    })
  }

  return {
    studentCourses,
    currentStudentCourse,
    isStudentCourseLoading,
    getJoinedCourses,
    getJoinedCourse,
    joinCourse,
    leaveCourse,
  }
}
