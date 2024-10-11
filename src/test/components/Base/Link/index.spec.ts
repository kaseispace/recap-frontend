// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Link from '@/components/Base/Link/index.vue'

describe('Linkコンポーネントのテスト', () => {
  it('propsが正しく渡される', async () => {
    const wrapper = await mountSuspended(Link, {
      props: { text: 'アカウントをお持ちでない方はこちら', path: 'signup' }
    })

    expect(wrapper.text()).toBe('アカウントをお持ちでない方はこちら')
    expect(wrapper.get('a').attributes('href')).toBe('/signup')
  })
})
