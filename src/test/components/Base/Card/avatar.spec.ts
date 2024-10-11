// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Avatar from '@/components/Base/Card/Avatar.vue'

describe('Avatarコンポーネントのテスト', () => {
  it('propsでbgColorに渡したclassが適用される', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: { bgColor: 'bg-cyan-600/10' }
    })

    expect(wrapper.find('div').classes()).toContain('bg-cyan-600/10')
  })
})
