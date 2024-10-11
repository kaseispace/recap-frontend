// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import NoCourseDate from '@/components/Domain/Teacher/course/SettingsMenu/NoCourseDate.vue'

mockComponent('BaseMore', {
  template: '<div>stub more</div>'
})

describe('NoCourseDateコンポーネントのテスト', () => {
  it('NoCourseDateコンポーネントが表示される', async () => {
    const wrapper = await mountSuspended(NoCourseDate)

    expect(wrapper.find(`[data-testId="settingsMenu"]`).exists()).toBe(true)
  })
})
