import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { readBody } from 'h3'
import { MOCK_STUDENT_AUTH_USER } from '@/test/mocks/index'
import { MOCK_STUDENT_USER_SCHOOL } from '@/test/mocks/user/index'
import { MOCK_SCHOOLS } from '@/test/mocks/school/index'
import type { schoolRequestBody } from '@/test/mocks/school/index'

const config = useRuntimeConfig()

export const registerUserEndpoints = () => {
  const auth = useAuth()

  // ユーザーの登録
  registerEndpoint(`${config.public.backendUrl}/users`, {
    method: 'POST',
    handler: () => {
      return {}
    }
  })

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

  // ユーザー情報の取得
  registerEndpoint(`${config.public.backendUrl}/user_schools`, {
    method: 'GET',
    handler: () => {
      return MOCK_STUDENT_USER_SCHOOL
    }
  })

  // ユーザー所属先の登録
  registerEndpoint(`${config.public.backendUrl}/user_schools`, {
    method: 'POST',
    handler: async (event) => {
      const body = await readBody<schoolRequestBody>(event)
      const school = MOCK_SCHOOLS.find(school => school.id === body.school_id)
      if (school) {
        return {
          user: { id: 1, uid: 'h9I0j1K2l3M4n5O6p7Q8r9S0t1U2', name: '中村八郎', user_type: 0 },
          school: { id: school.id, name: school.name }
        }
      }
    }
  })
}
