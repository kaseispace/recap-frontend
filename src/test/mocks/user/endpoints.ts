import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { MOCK_STUDENT_AUTH_USER } from '@/test/mocks/index'
import { MOCK_CURRENT_USER } from '@/test/mocks/user/index'

const config = useRuntimeConfig()

export const registerUserEndpoints = () => {
  // ユーザーの削除
  registerEndpoint(`${config.public.backendUrl}/users/${MOCK_STUDENT_AUTH_USER.uid}`, {
    method: 'DELETE',
    handler: () => {
      const deleteUser = MOCK_CURRENT_USER.find(user => user.uid === MOCK_STUDENT_AUTH_USER.uid)
      if (deleteUser) {
        return {}
      }
    }
  })
}
