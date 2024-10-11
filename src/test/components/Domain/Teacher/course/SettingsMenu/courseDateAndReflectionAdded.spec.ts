// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import CourseDateAndReflectionAdded from '@/components/Domain/Teacher/course/SettingsMenu/CourseDateAndReflectionAdded.vue'

mockComponent('BaseMore', {
  template: '<div>stub more</div>'
})

describe('CourseDateAndReflectionAddedコンポーネントのテスト', () => {
  it('CourseDateAndReflectionAddedコンポーネントが表示される', async () => {
    const wrapper = await mountSuspended(CourseDateAndReflectionAdded)

    expect(wrapper.find(`[data-testId="settingsMenu"]`).exists()).toBe(true)
  })
})
