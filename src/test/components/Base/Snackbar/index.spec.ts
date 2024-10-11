// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Snackbar from '@/components/Base/Snackbar/index.vue'

describe('Snackbarコンポーネントのテスト', () => {
  it('初期状態では、通知は表示されない', async () => {
    const wrapper = await mountSuspended(Snackbar, {
      props: { notification: null, status: false }
    })

    expect(wrapper.find(`[data-testId="invisible"]`).exists()).toBe(false)
  })

  it('propsからnotificationに値がが渡された場合、通知が表示される', async () => {
    const wrapper = await mountSuspended(Snackbar, {
      props: { notification: null, status: false }
    })

    await wrapper.setProps({ notification: { value: 1, text: UNEXPECTED_ERROR_MESSAGE }, status: false })

    expect(wrapper.find(`[data-testId="invisible"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testId="invisible"]`).text()).toBe(UNEXPECTED_ERROR_MESSAGE)
    expect(wrapper.find(`[data-testId="propsStatus"]`).classes()).toContain('bg-red-500')
  })

  it('通知は5秒後に表示されなくなる', async () => {
    vi.useFakeTimers()
    const wrapper = await mountSuspended(Snackbar, {
      props: { notification: null, status: false }
    })

    await wrapper.setProps({ notification: { value: 1, text: UNEXPECTED_ERROR_MESSAGE }, status: false })

    vi.advanceTimersByTime(5000)

    await wrapper.vm.$nextTick()

    expect(wrapper.find(`[data-testId="invisible"]`).exists()).toBe(false)
  })
})
