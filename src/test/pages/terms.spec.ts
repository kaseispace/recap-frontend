// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import termsPage from '@/pages/terms.vue'

describe('termsPageページのテスト', () => {
  it('各セクションタイトルが表示される', async () => {
    const wrapper = await mountSuspended(termsPage)

    expect(wrapper.get('h1').text()).toBe('利用規約')

    const sectionHeaders = wrapper.findAll('h2')

    expect(sectionHeaders[0].text()).toBe('第1条（適用）')
    expect(sectionHeaders[1].text()).toBe('第2条（利用登録）')
    expect(sectionHeaders[2].text()).toBe('第3条（ユーザーIDおよびパスワードの管理）')
    expect(sectionHeaders[3].text()).toBe('第4条（利用料金）')
    expect(sectionHeaders[4].text()).toBe('第5条（禁止事項）')
    expect(sectionHeaders[5].text()).toBe('第6条（本サービスの提供の停止等）')
    expect(sectionHeaders[6].text()).toBe('第7条（利用制限および登録抹消）')
    expect(sectionHeaders[7].text()).toBe('第8条（退会）')
    expect(sectionHeaders[8].text()).toBe('第9条（保証の否認および免責事項）')
    expect(sectionHeaders[9].text()).toBe('第10条（サービス内容の変更等）')
    expect(sectionHeaders[10].text()).toBe('第11条（利用規約の変更）')
    expect(sectionHeaders[11].text()).toBe('第12条（個人情報の取扱い）')
    expect(sectionHeaders[12].text()).toBe('第13条（通知または連絡）')
    expect(sectionHeaders[13].text()).toBe('第14条（権利義務の譲渡の禁止）')
    expect(sectionHeaders[14].text()).toBe('第15条（準拠法・裁判管轄）')
  })
})
