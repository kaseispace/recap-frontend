// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '@/pages/teacher/index.vue'

mockComponent('BaseTitle', {
  template: '<div data-testId="title">stub title</div>'
})

mockComponent('DomainTeacherIndexCreateCourseCard', {
  template: '<div data-testId="createCourseCard">stub create course</div>'
})

mockComponent('DomainTeacherIndexShowCourseCard', {
  template: '<div data-testId="showCourseCard">stub course card</div>'
})

describe('indexページのテスト', () => {
  it('授業一覧が表示される', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.find(`[data-testId="title"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testId="createCourseCard"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testId="showCourseCard"]`).exists()).toBe(true)
  })
})
