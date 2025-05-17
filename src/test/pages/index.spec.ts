// @vitest-environment nuxt
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '@/pages/index.vue'

mockComponent('NuxtImg', {
  template: '<div data-testId="img">stub img</div>'
})

mockComponent('BaseFlowStep', {
  template: '<div data-testId="flowStep">stub flow step</div>'
})

mockComponent('BaseFlowTriangle', {
  template: '<div data-testId="flowTriangle">stub flow triangle</div>'
})

mockComponent('BaseCardInfo', {
  template: '<div data-testId="info">stub info</div>'
})

describe('indexページのテスト', () => {
  it('主要な説明テキストが適切にレンダリングされる', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.get('h1').text()).toContain('振り返りで')
    expect(wrapper.get('h1').text()).toContain('学びをもっと深く')

    expect(wrapper.get(`[data-testId="catchphraseDescription"]`).text()).toContain('対話型振り返りシステム「ReCap」')
    expect(wrapper.get(`[data-testId="catchphraseDescription"]`).text()).toContain('教員と学生のための振り返り学習プラットフォーム')

    const images = wrapper.findAll(`[data-testId="img"]`)
    expect(images[0].attributes('src')).toBe('hero-banner_rkubku.png')
    expect(images[1].attributes('src')).toBe('recap-pc_dwzb62.png')

    const sectionHeaders = wrapper.findAll('h2')
    expect(sectionHeaders[0].text()).toBe('ReCapとは')
    expect(sectionHeaders[1].text()).toBe('ReCapの主な機能')

    expect(wrapper.find(`[data-testId="flowStep"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testId="flowTriangle"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testId="info"]`).exists()).toBe(true)
  })
})
