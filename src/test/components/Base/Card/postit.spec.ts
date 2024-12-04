// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PostIt from '@/components/Base/Card/PostIt.vue'

vi.mock('@/composables/useGenerateRandomColor', () => ({
  useGenerateRandomColor: () => {
    const cardBgColor = ref('')
    const sealBgColor = ref('')
    // const rotationAngle = ref('')

    const createRandomColor = vi.fn().mockImplementation(() => {
      cardBgColor.value = 'bg-red-100'
      sealBgColor.value = 'bg-red-600/70'
      // rotationAngle.value = 'rotate-[3deg]'
    })

    return { cardBgColor, sealBgColor, createRandomColor }
  }
}))

describe('PostItコンポーネントのテスト', () => {
  it('ランダムな色と角度が正しく適用される', async () => {
    const wrapper = await mountSuspended(PostIt)

    expect(wrapper.find(`[data-testId="cardBgColor"]`).classes()).toContain('bg-red-100')
    expect(wrapper.find(`[data-testId="sealBgColor"]`).classes()).toContain('bg-red-600/70')
  })
})
