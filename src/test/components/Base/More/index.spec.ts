// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import More from '@/components/Base/More/index.vue'

describe('Moreコンポーネントのテスト', () => {
  it('propsで値が渡された場合、正しく値が適用される', async () => {
    const wrapper = await mountSuspended(More, {
      props: { menuArray: TEACHER_COURSE_SETTINGS, hoverBgcolor: 'hover:bg-cyan-400/50' }
    })

    expect(wrapper.get(`[data-testId="propsHoverBgcolor"]`).classes()).toContain('hover:bg-cyan-400/50')
  })

  it('propsから渡されたteacherCourseSettingが、メニューリスト内に表示される', async () => {
    const wrapper = await mountSuspended(More, {
      props: { menuArray: TEACHER_COURSE_SETTINGS, hoverBgcolor: 'hover:bg-cyan-400/50' }
    })

    await wrapper.get(`[data-testId="propsHoverBgcolor"]`).trigger('click')

    TEACHER_COURSE_SETTINGS.forEach((content) => {
      expect(wrapper.find(`[data-testId="invisible"]`).text()).toContain(content.text)
    })
  })

  it('メニューリストから「削除」を選択した場合、emitが実行され、値「2」が正しく渡されている', async () => {
    const wrapper = await mountSuspended(More, {
      props: { menuArray: TEACHER_COURSE_SETTINGS, hoverBgcolor: 'hover:bg-cyan-400/50' }
    })

    await wrapper.get(`[data-testId="propsHoverBgcolor"]`).trigger('click')
    await wrapper.find(`[data-testId="textIndex-1"]`).trigger('click')

    expect(wrapper.emitted()).toHaveProperty('selectMenu')
    expect(wrapper.emitted().selectMenu[0]).toEqual([2])
  })
})
