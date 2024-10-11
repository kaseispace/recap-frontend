// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TextInput from '@/components/Base/Form/TextInput.vue'

describe('TextInputコンポーネントのテスト', () => {
  it('propsでmodelValueに「佐藤太郎」が渡された場合、入力要素の値が「佐藤太郎」になる', async () => {
    const wrapper = await mountSuspended(TextInput, {
      props: { modelValue: '佐藤太郎' }
    })

    expect(wrapper.vm.modelValue).toBe('佐藤太郎')
  })

  it('オプショナルなpropsが渡された場合、それぞれの属性に設定される', async () => {
    const wrapper = await mountSuspended(TextInput, {
      props: { modelValue: '1234password', inputId: 'password', inputType: 'password', wide: 'w-20' }
    })

    expect(wrapper.attributes().id).toBe('password')
    expect(wrapper.attributes().type).toBe('password')
    expect(wrapper.classes()).toContain('w-20')
    expect(wrapper.classes()).not.toContain('w-full')
  })

  it('inputイベント発火時にemitが1回実行される', async () => {
    const wrapper = await mountSuspended(TextInput, {
      props: { modelValue: '', inputId: 'name', inputPlaceholder: '佐藤太郎' }
    })

    await wrapper.get('input').setValue('佐藤次郎')

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
  })
})
