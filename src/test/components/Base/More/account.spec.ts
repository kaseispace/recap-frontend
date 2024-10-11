// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import Account from '@/components/Base/More/Account.vue'

mockComponent('Icon', {
  template: '<div>stub icon</div>'
})

describe('Accountコンポーネントのテスト', () => {
  it('デフォルトではメニューリストは閉じている', async () => {
    const wrapper = await mountSuspended(Account, {
      props: { name: '山田太郎', email: 'taro.yamada@example.com', role: 0 }
    })

    const menu = wrapper.find(`[data-testId="menuList"]`)

    expect((menu.element as HTMLElement).style.display).toBe('none')
  })

  it('アカウントアイコンをクリックすると、メニューリストが表示され、propsで渡した値が表示される', async () => {
    const wrapper = await mountSuspended(Account, {
      props: { name: '山田太郎', email: 'taro.yamada@example.com', role: 0 }
    })

    await wrapper.get(`[data-testId="dropdown"]`).trigger('click')

    const menu = wrapper.find(`[data-testId="menuList"]`)

    expect((menu.element as HTMLElement).style.display).not.toBe('none')
    expect(wrapper.get(`[data-testId="name"]`).text()).toBe('山田太郎')
    expect(wrapper.get(`[data-testId="email"]`).text()).toBe('taro.yamada@example.com')
    expect(wrapper.get(`[data-testId="role"]`).text()).toBe('学生')
  })

  it('メニューリストの0番目を選択時にemitが実行され、正しい値が渡される', async () => {
    const wrapper = await mountSuspended(Account, {
      props: { name: '山田太郎', email: 'taro.yamada@example.com', role: 0 }
    })

    await wrapper.get(`[data-testId="dropdown"]`).trigger('click')
    await wrapper.get(`[data-testId="textIndex-0"]`).trigger('click')

    expect(wrapper.emitted()).toHaveProperty('selectMenu')
    expect(wrapper.emitted().selectMenu).toEqual([[1]])
  })
})
