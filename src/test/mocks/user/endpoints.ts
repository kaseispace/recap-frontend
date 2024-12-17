import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { MOCK_STUDENT_AUTH_USER } from '@/test/mocks/index'

const config = useRuntimeConfig()

export const registerUserEndpoints = () => {
  const auth = useAuth()
  // ユーザーの削除
  registerEndpoint(`${config.public.backendUrl}/users/${MOCK_STUDENT_AUTH_USER.uid}`, {
    method: 'DELETE',
    handler: () => {
      if (auth.authUser.value) {
        if (auth.authUser.value.uid === MOCK_STUDENT_AUTH_USER.uid) {
          return {}
        }
      }
    }
  })
}
