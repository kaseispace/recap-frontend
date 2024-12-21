export const useReflectionApi = () => {
  const config = useRuntimeConfig()
  // 既に今日の振り返りが終わっているかどうかを判定するフラグ
  const studentReflections = useState<StudentCourseReflection[] | null>('studentReflections', () => null)
  // 学生自身が振り返り登録済みかどうか
  const isTodayReflected = useState<boolean | null>('isTodayReflected', () => null)
  const teacherReflectionFlag = useState<boolean | null>('teacherReflectionFlag', () => null)
  // 授業内に登録された各ユーザーの振り返り
  const courseUserReflections = useState<CourseUserReflections[] | null>('courseUserReflections', () => null)
  const sharedCourseReflections = useState<SharedReflectionRecord[] | null>('sharedCourseReflections', () => null)
  const selectedCourseDateReflections = useState<UserReflections[] | null>('selectedCourseDateReflections', () => null)

  const getStudentReflection = async (uuid: string, idToken: string): Promise<StudentCourseReflection[]> => {
    const data = await $fetch<StudentCourseReflection[]>(
      `${config.public.backendUrl}/reflections/student_reflections?uuid=${uuid}`,
      {
        headers: { Authorization: `Bearer ${idToken}` }
      }
    )
    return data
  }

  const getAllStudentReflectionStatus = async (uuid: string, idToken: string): Promise<CourseReflections[]> => {
    const data = await $fetch<CourseReflections[]>(
      `${config.public.backendUrl}/reflections/all_student_reflection_status?uuid=${uuid}`,
      {
        headers: { Authorization: `Bearer ${idToken}` }
      }
    )
    return data
  }

  const getAllStudentReflections = async (uuid: string, idToken: string): Promise<CourseUserReflections[]> => {
    const data = await $fetch<CourseUserReflections[]>(
      `${config.public.backendUrl}/reflections/all_student_reflections?uuid=${uuid}`,
      {
        headers: { Authorization: `Bearer ${idToken}` }
      }
    )
    return data
  }

  const checkReflectionOnDate = async (courseId: number, courseDateId: number, idToken: string): Promise<boolean> => {
    const data = await $fetch<boolean>(
      `${config.public.backendUrl}/reflections/check_reflection_on_date?id=${courseId}&course_date_id=${courseDateId}`,
      {
        headers: { Authorization: `Bearer ${idToken}` }
      }
    )
    return data
  }

  const getSharedReflections = async (uuid: string, idToken: string): Promise<SharedReflectionRecord[]> => {
    const data = await $fetch<SharedReflectionRecord[]>(
      `${config.public.backendUrl}/reflections/shared_reflections?uuid=${uuid}`,
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
    const requestBody = { uuid, reflection: { course_date_id: courseDateId, reflections } }
    const data = await $fetch<StudentCourseReflection[]>(`${config.public.backendUrl}/reflections`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody
    })
    return data
  }

  const updateReflection = async (reflectionId: number, message: string, idToken: string): Promise<Reflection> => {
    const requestBody = { message }
    const data = await $fetch<Reflection>(`${config.public.backendUrl}/reflections/${reflectionId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody
    })
    return data
  }

  return {
    studentReflections,
    isTodayReflected,
    teacherReflectionFlag,
    courseUserReflections,
    sharedCourseReflections,
    selectedCourseDateReflections,
    getStudentReflection,
    getAllStudentReflectionStatus,
    getAllStudentReflections,
    checkReflectionOnDate,
    getSharedReflections,
    createReflection,
    updateReflection
  }
}
