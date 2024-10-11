// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Tab from '@/components/Base/Tab/index.vue'

describe('Tabコンポーネントのテスト', () => {
  it('propsで値が渡された場合、正しく値が表示される', async () => {
    const wrapper = await mountSuspended(Tab, {
      props: { text: 'テスト用タブ', isActive: true, activeColor: 'border-cyan-600  text-cyan-600' }
    })

    expect(wrapper.text()).toBe('テスト用タブ')
  })

  it('propsでisActiveにtrueが渡された場合、activeColorが適用される', async () => {
    const wrapper = await mountSuspended(Tab, {
      props: { text: 'テスト用タブ', isActive: true, activeColor: 'border-cyan-600  text-cyan-600' }
    })

    expect(wrapper.find('a').classes()).toEqual(expect.arrayContaining(['border-cyan-600', 'text-cyan-600']))
  })

  it('propsでisActiveにfalseが渡された場合、activeColorが適用されない', async () => {
    const wrapper = await mountSuspended(Tab, {
      props: { text: 'テスト用タブ', isActive: false, activeColor: 'border-cyan-600  text-cyan-600' }
    })

    expect(wrapper.find('a').classes()).not.toEqual(expect.arrayContaining(['border-cyan-600', 'text-cyan-600']))
  })

  it('clickイベント発火時にemitが1回実行される', async () => {
    const wrapper = await mountSuspended(Tab, {
      props: { text: 'テスト用タブ', isActive: true, activeColor: 'border-cyan-600  text-cyan-600' }
    })

    await wrapper.get('li').trigger('click')

    expect(wrapper.emitted('clickEmit')).toHaveLength(1)
  })
})
