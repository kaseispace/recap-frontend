import { defineVitestConfig } from '@nuxt/test-utils/config'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    env: {
      NODE_ENV: 'test'
    }
  }
})
