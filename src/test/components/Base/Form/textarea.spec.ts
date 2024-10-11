// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Textarea from '@/components/Base/Form/Textarea.vue'

describe('Textareaコンポーネントのテスト', () => {
  it('propsで値が渡された場合、正しく値が適用される', async () => {
    const wrapper = await mountSuspended(Textarea, {
      props: { modelValue: '来週は休校です。', textareaPlaceholder: 'ここにお知らせを入力', defaultHeight: '150px' }
    })

    expect(wrapper.vm.modelValue).toBe('来週は休校です。')
    expect(wrapper.attributes().placeholder).toBe('ここにお知らせを入力')
  })

  it('inputイベント発火時にemitが1回実行される', async () => {
    const wrapper = await mountSuspended(Textarea, {
      props: { modelValue: '', textareaPlaceholder: 'ここにお知らせを入力', defaultHeight: '150px' }
    })

    await wrapper.get('textarea').setValue('来週は204クラスに集合してください。')

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
  })
})
