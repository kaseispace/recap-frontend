// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AutoComplete from '@/components/Base/Form/AutoComplete.vue'
import { MOCK_SCHOOLS } from '@/test/mocks/school/index'

describe('AutoCompleteコンポーネントのテスト', () => {
  it('入力値に基づいて適切なサジェストが表示される', async () => {
    const wrapper = await mountSuspended(AutoComplete, {
      props: { modelValue: '大学', inputId: 'schoolName', suggestionArray: MOCK_SCHOOLS }
    })

    expect(wrapper.vm.modelValue).toBe('大学')
    expect(wrapper.get('input').attributes('id')).toBe('schoolName')

    const count = wrapper.findAll(`[data-testId^="suggest"]`).length

    for (let i = 0; i < count; i++) {
      expect(wrapper.find(`[data-testId="suggest-${i}"]`).text()).toContain('大学')
    }
  })

  it('候補が存在しない場合、サジェストは表示されない', async () => {
    const wrapper = await mountSuspended(AutoComplete, {
      props: { modelValue: '高校', inputId: 'schoolName', suggestionArray: MOCK_SCHOOLS }
    })

    expect(wrapper.find(`[data-testId="suggest-0"]`).exists()).toBe(false)
  })

  it('サジェストから1つクリックすると、emitが1回実行される', async () => {
    const wrapper = await mountSuspended(AutoComplete, {
      props: { modelValue: '東京', inputId: 'schoolName', suggestionArray: MOCK_SCHOOLS }
    })

    await wrapper.find(`[data-testId="suggest-0"]`).trigger('click')

    expect(wrapper.emitted('selectSuggestion')).toHaveLength(1)
  })

  it('上矢印キーを押した後に、エンターキーを押すと、emitが1回実行される', async () => {
    const wrapper = await mountSuspended(AutoComplete, {
      props: { modelValue: '東京', inputId: 'schoolName', suggestionArray: MOCK_SCHOOLS }
    })

    await wrapper.find('input').trigger('keydown.up')
    await wrapper.find('input').trigger('keydown.enter')

    expect(wrapper.emitted('selectSuggestion')).toHaveLength(1)
  })

  it('下矢印キーを押した後に、エンターキーを押すと、emitが1回実行される', async () => {
    const wrapper = await mountSuspended(AutoComplete, {
      props: { modelValue: '東京', inputId: 'schoolName', suggestionArray: MOCK_SCHOOLS }
    })

    await wrapper.find('input').trigger('keydown.down')
    await wrapper.find('input').trigger('keydown.enter')

    expect(wrapper.emitted('selectSuggestion')).toHaveLength(1)
  })
})
