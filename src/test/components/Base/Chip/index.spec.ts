// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Chip from '@/components/Base/Chip/index.vue'

describe('Chipコンポーネントのテスト', () => {
  it('propsでisActiveにtrueが渡された場合、activeColorが適用される', async () => {
    const wrapper = await mountSuspended(Chip, {
      props: { text: '月曜日', activeColor: 'bg-cyan-600/10 text-cyan-900', isActive: true }
    })

    expect(wrapper.attributes().class).toContain('bg-cyan-600/10 text-cyan-900')
  })

  it('propsでisActiveにfalseが渡された場合、activeColorが適用されない', async () => {
    const wrapper = await mountSuspended(Chip, {
      props: { text: '月曜日', activeColor: 'bg-cyan-600/10 text-cyan-900', isActive: false }
    })

    expect(wrapper.attributes().class).not.toContain('bg-cyan-600/10 text-cyan-900')
  })

  it('clickイベント発火時にemitが1回実行される', async () => {
    const wrapper = await mountSuspended(Chip, {
      props: { text: '月曜日', activeColor: 'bg-cyan-600/10 text-cyan-900', isActive: true }
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('clickEmit')).toHaveLength(1)
  })
})
