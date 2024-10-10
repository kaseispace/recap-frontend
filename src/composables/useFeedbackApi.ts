export const useFeedbackApi = () => {
  const config = useRuntimeConfig()
  const studentFeedbacks = useState<Feedback[] | null>('studentFeedbacks', () => null)

  const getStudentFeedbacks = async (uuid: string, idToken: string): Promise<Feedback[] | null> => {
    const data = await $fetch<Feedback[] | null>(
      `${config.public.devBackendUrl}/feedbacks/student_feedbacks?uuid=${uuid}`,
      {
        headers: { Authorization: `Bearer ${idToken}` },
      },
    )
    return data
  }

  const createFeedback = async (
    uuid: string,
    courseDateId: number,
    message: string[],
    idToken: string,
  ): Promise<Feedback> => {
    const requestBody = { feedback: { uuid, course_date_id: courseDateId, reflection_history: message } }
    const data = await $fetch<Feedback>(`${config.public.devBackendUrl}/feedbacks`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody,
    })
    return data
  }

  return {
    studentFeedbacks,
    getStudentFeedbacks,
    createFeedback,
  }
}
