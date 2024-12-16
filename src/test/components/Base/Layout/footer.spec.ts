// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import Footer from '@/components/Base/Layout/Footer.vue'

mockComponent('Icon', {
  template: '<div>stub Link</div>'
})

describe('Footerコンポーネントのテスト', () => {
  it('ポリシーリンクとSNSリンクが正しく表示される', async () => {
    const wrapper = await mountSuspended(Footer)

    POLICY_LINKS.forEach((policy) => {
      const policyLink = wrapper.get(`[data-testId="${policy.value}"]`)
      expect(policyLink.text()).toBe(policy.name)
      expect(policyLink.get('a').attributes().href).toBe(`/${policy.path}`)
    })

    SNS_LINKS.forEach((socialLink) => {
      const snsLink = wrapper.get(`[data-test-linkId="${socialLink.value}"]`)
      expect(snsLink.attributes().href).toBe(socialLink.path)
      expect(snsLink.get('div').attributes().name).toBe(socialLink.iconName)
    })
  })
})
