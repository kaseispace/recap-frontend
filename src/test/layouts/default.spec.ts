// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import defaultLayout from '@/layouts/default.vue'
import { MOCK_STUDENT_USER_SCHOOL } from '@/test/mocks/user/index'

mockComponent('NuxtLink', {
  template: '<a data-testId="nuxt-link">stub nuxt-link</a>'
})

mockComponent('BaseLink', {
  template: '<a data-testId="base-link">stub base-link</a>'
})

mockComponent('BaseLayoutFooter', {
  template: '<div data-testId="footer">stub footer</div>'
})

describe('defaultLayoutのテスト', () => {
  let user: UserApiReturnType

  beforeEach(() => {
    user = useUserApi()
  })

  afterEach(() => {
    user.userInfo.value = null
  })

  describe('非ログイン時', () => {
    it('ログインと新規登録リンクが表示される', async () => {
      user.userInfo.value = null
      const wrapper = await mountSuspended(defaultLayout)

      expect(wrapper.find(`[data-testId="base-link"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="nuxt-link"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="footer"]`).exists()).toBe(true)
    })
  })

  describe('ログイン時', () => {
    it('ログインと新規登録リンクが表示されない', async () => {
      user.userInfo.value = MOCK_STUDENT_USER_SCHOOL
      const wrapper = await mountSuspended(defaultLayout)

      expect(wrapper.find(`[data-testId="link"]`).exists()).toBe(false)
      expect(wrapper.find(`[data-testId="nuxt-link"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-testId="footer"]`).exists()).toBe(true)
    })
  })
})
