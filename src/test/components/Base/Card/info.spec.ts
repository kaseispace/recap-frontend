// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import Info from '@/components/Base/Card/Info.vue'

mockComponent('NuxtImg', {
  template: '<div data-testId="propsImg">stub img</div>'
})

describe('Infoコンポーネントのテスト', () => {
  it('propsが正しく渡される', async () => {
    const wrapper = await mountSuspended(Info, {
      props: {
        name: 'プロンプト機能',
        description: [
          '授業ごとにカスタム質問を設定し、振り返りを促します。',
          '複数の質問を登録でき、柔軟な運用が可能です。'
        ],
        imagePath: 'recap-prompt_jlp7wo.png',
        isImageFirst: true
      }
    })

    expect(wrapper.get(`[data-testId="propsImg"]`).attributes('src')).toBe('recap-prompt_jlp7wo.png')
    expect(wrapper.get('h3').text()).toBe('プロンプト機能')
    expect(wrapper.get(`[data-testId="desc-0"]`).text()).toContain('授業ごとにカスタム質問を設定し、振り返りを促します。')
    expect(wrapper.get(`[data-testId="desc-1"]`).text()).toContain('複数の質問を登録でき、柔軟な運用が可能です。')
  })
})
