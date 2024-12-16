// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import privacyPage from '@/pages/privacy.vue'

describe('privacyPageページのテスト', () => {
  it('各セクションタイトルが表示される', async () => {
    const wrapper = await mountSuspended(privacyPage)

    expect(wrapper.get('h1').text()).toBe('プライバシーポリシー')

    const sectionHeaders = wrapper.findAll('h2')

    expect(sectionHeaders[0].text()).toBe('第1条（個人情報）')
    expect(sectionHeaders[1].text()).toBe('第2条（個人情報の収集方法）')
    expect(sectionHeaders[2].text()).toBe('第3条（個人情報を収集・利用する目的）')
    expect(sectionHeaders[3].text()).toBe('第4条（利用目的の変更）')
    expect(sectionHeaders[4].text()).toBe('第5条（個人情報の第三者提供）')
    expect(sectionHeaders[5].text()).toBe('第6条（プライバシーポリシーの変更）')
  })
})
