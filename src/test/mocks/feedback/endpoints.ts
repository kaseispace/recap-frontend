import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { emptyDataUUID, dataUUID } from '@/test/mocks/index'
import { mockFeedbacksData } from '@/test/mocks/feedback/index'

const config = useRuntimeConfig()

export const registerFeedbackEndpoints = () => {
  registerEndpoint(`${config.public.backendUrl}/feedbacks/student_feedbacks?uuid=${emptyDataUUID}`, {
    method: 'GET',
    handler: () => {
      return []
    }
  })

  registerEndpoint(`${config.public.backendUrl}/feedbacks/student_feedbacks?uuid=${dataUUID}`, {
    method: 'GET',
    handler: () => {
      return mockFeedbacksData
    }
  })

  registerEndpoint(`${config.public.backendUrl}/feedbacks`, {
    method: 'POST',
    handler: () => {
      return {
        id: 3,
        user_id: 1,
        course_id: 1,
        course_date_id: 3,
        comment: 'テストフィードバック'
      }
    }
  })
}
