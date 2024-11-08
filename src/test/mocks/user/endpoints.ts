import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { mockAuthUser } from '@/test/mocks/index'
import { mockCurrentUserData } from '@/test/mocks/user/index'

const config = useRuntimeConfig()

export const registerUserEndpoints = () => {
  // ユーザーの削除
  registerEndpoint(`${config.public.backendUrl}/users/${mockAuthUser.uid}`, {
    method: 'DELETE',
    handler: () => {
      const deleteUser = mockCurrentUserData.find(user => user.uid === mockAuthUser.uid)
      if (deleteUser) {
        return {}
      }
    }
  })
}
