export const useReflectionApi = () => {
  const config = useRuntimeConfig()
  // 既に今日の振り返りが終わっているかどうかを判定するフラグ
  const studentReflections = useState<StudentCourseReflection[] | null>('studentReflections', () => null)
  const isTodayReflected = useState<boolean | null>('isTodayReflected', () => null) // 学生自身が振り返り登録済みかどうか
  const teacherReflectionFlag = useState<boolean | null>('teacherReflectionFlag', () => null)

  // 授業内に登録された各ユーザーの振り返り
  const courseUserReflections = useState<CourseUserReflections[] | null>('courseUserReflections', () => null)

  const getStudentReflection = async (uuid: string, idToken: string): Promise<StudentCourseReflection[]> => {
    const data = await $fetch<StudentCourseReflection[]>(
      `${config.public.devBackendUrl}/reflections/student_reflections?uuid=${uuid}`,
      {
        headers: { Authorization: `Bearer ${idToken}` }
      }
    )
    return data
  }

  const getAllStudentReflectionStatus = async (uuid: string, idToken: string): Promise<CourseReflections[]> => {
    const data = await $fetch<CourseReflections[]>(
      `${config.public.devBackendUrl}/reflections/all_student_reflection_status?uuid=${uuid}`,
      {
        headers: { Authorization: `Bearer ${idToken}` }
      }
    )
    return data
  }

  const getAllStudentReflections = async (uuid: string, idToken: string): Promise<CourseUserReflections[]> => {
    const data = await $fetch<CourseUserReflections[]>(
      `${config.public.devBackendUrl}/reflections/all_student_reflections?uuid=${uuid}`,
      {
        headers: { Authorization: `Bearer ${idToken}` }
      }
    )
    return data
  }

  // 授業日当日に既に灯篭済みの振り返りがあるかどうかの確認
  const checkReflectionOnDate = async (courseId: number, courseDateId: number, idToken: string): Promise<boolean> => {
    const data = await $fetch<boolean>(
      `${config.public.devBackendUrl}/reflections/check_reflection_on_date?id=${courseId}&course_date_id=${courseDateId}`,
      {
        headers: { Authorization: `Bearer ${idToken}` }
      }
    )
    return data
  }

  const createReflection = async (
    uuid: string,
    courseDateId: number,
    reflections: ChatMessage[],
    idToken: string
  ): Promise<StudentCourseReflection[]> => {
    const requestBody = { uuid, course_date_id: courseDateId, reflections }
    const data = await $fetch<StudentCourseReflection[]>(`${config.public.devBackendUrl}/reflections`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody
    })
    return data
  }

  const updateReflection = async (reflectionId: number, message: string, idToken: string): Promise<Reflection> => {
    const requestBody = { message }
    const data = await $fetch<Reflection>(`${config.public.devBackendUrl}/reflections/${reflectionId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody
    })
    return data
  }

  return {
    studentReflections,
    // courseReflections,
    isTodayReflected,
    teacherReflectionFlag,
    courseUserReflections,
    getStudentReflection,
    getAllStudentReflectionStatus,
    getAllStudentReflections,
    checkReflectionOnDate,
    createReflection,
    updateReflection
  }
}
