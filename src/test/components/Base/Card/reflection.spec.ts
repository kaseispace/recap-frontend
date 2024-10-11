// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Reflection from '@/components/Base/Card/Reflection.vue'

describe('Reflectionコンポーネントのテスト', () => {
  it('propsが正しく渡される', async () => {
    const wrapper = await mountSuspended(Reflection, {
      props: { title: '第1回', date: '7/3' }
    })

    expect(wrapper.find('h1').text()).toBe('第1回')
    expect(wrapper.find('p').text()).toBe('7/3')
  })
})
