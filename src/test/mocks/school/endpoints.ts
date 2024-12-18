import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { MOCK_SCHOOLS } from '@/test/mocks/school/index'

const config = useRuntimeConfig()

export const registerSchoolEndpoints = () => {
  // 学校一覧の取得
  registerEndpoint(`${config.public.backendUrl}/schools`, {
    method: 'GET',
    handler: () => {
      return MOCK_SCHOOLS
    }
  })
}
