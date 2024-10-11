// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import CourseDateAddedNoReflection from '@/components/Domain/Teacher/course/SettingsMenu/CourseDateAddedNoReflection.vue'

mockComponent('BaseMore', {
  template: '<div>stub more</div>'
})

describe('CourseDateAddedNoReflectionコンポーネントのテスト', () => {
  it('CourseDateAddedNoReflectionコンポーネントが表示される', async () => {
    const wrapper = await mountSuspended(CourseDateAddedNoReflection)

    expect(wrapper.find(`[data-testId="settingsMenu"]`).exists()).toBe(true)
  })
})
