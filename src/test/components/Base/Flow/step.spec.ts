// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import Step from '@/components/Base/Flow/Step.vue'

mockComponent('NuxtImg', {
  template: '<div data-testId="propsImg">stub img</div>'
})

describe('Stepコンポーネントのテスト', () => {
  it('propsが正しく渡される', async () => {
    const wrapper = await mountSuspended(Step, {
      props: {
        timing: '授業開始前',
        userType: '教員',
        stepNumber: 'STEP1',
        imagePath: 'recap-schedule_wpnox4.png',
        subtitle: '授業日の登録'
      }
    })

    expect(wrapper.get(`[data-testId="propsStepStatus"]`).text()).toContain('授業開始前')
    expect(wrapper.get(`[data-testId="propsStepStatus"]`).text()).toContain('教員')
    expect(wrapper.get(`[data-testId="propsStepNumber"]`).text()).toContain('STEP1')
    expect(wrapper.get(`[data-testId="propsImg"]`).attributes('src')).toBe('recap-schedule_wpnox4.png')
    expect(wrapper.get('h4').text()).toBe('授業日の登録')
  })
})
