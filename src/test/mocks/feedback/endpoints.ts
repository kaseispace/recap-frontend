import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { MOCK_EMPTY_UUID, MOCK_UUID } from '@/test/mocks/index'
import { MOCK_FEEDBACKS } from '@/test/mocks/feedback/index'

const config = useRuntimeConfig()

export const registerFeedbackEndpoints = () => {
  registerEndpoint(`${config.public.backendUrl}/feedbacks/student_feedbacks?uuid=${MOCK_EMPTY_UUID}`, {
    method: 'GET',
    handler: () => {
      return []
    }
  })

  registerEndpoint(`${config.public.backendUrl}/feedbacks/student_feedbacks?uuid=${MOCK_UUID}`, {
    method: 'GET',
    handler: () => {
      return MOCK_FEEDBACKS
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
