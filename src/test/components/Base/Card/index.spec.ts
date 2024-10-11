// @vitest-environment nuxt
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Card from '@/components/Base/Card/index.vue'
import Chip from '@/components/Base/Card/Chips.vue'

describe('Cardコンポーネントのテスト', () => {
  it('propsが正しく渡される', async () => {
    const wrapper = await mountSuspended(Card, {
      props: {
        subjectName: 'JavaScript',
        pathName: StudentCourseDetail,
        paramId: '123e4567-e89b-12d3-a456-426614174000',
        bgColor: 'bg-cyan-900'
      }
    })

    expect(wrapper.get('a').attributes('href')).toBe('/student/course/123e4567-e89b-12d3-a456-426614174000')
    expect(wrapper.get(`[data-testId="propsBgColor"]`).classes()).toContain('bg-cyan-900')
    expect(wrapper.get(`[data-testId="propsSubjectName"]`).text()).toBe('JavaScript')
  })

  it('オプショナルなpropsであるteacherNameに「佐藤太郎」が渡された場合、「佐藤太郎」が表示される', async () => {
    const wrapper = await mountSuspended(Card, {
      props: {
        subjectName: 'JavaScript',
        pathName: StudentCourseDetail,
        paramId: '123e4567-e89b-12d3-a456-426614174000',
        bgColor: 'bg-cyan-900',
        teacherName: '佐藤太郎'
      }
    })

    expect(wrapper.find(`[data-testId="propsTeacherName"]`).text()).toBe('佐藤太郎')
  })

  it('chipスロットにCardChipコンポーネントを渡すと、正しくレンダリングされる', async () => {
    const wrapper = await mountSuspended(Card, {
      props: {
        subjectName: 'JavaScript',
        pathName: StudentCourseDetail,
        paramId: '123e4567-e89b-12d3-a456-426614174000',
        bgColor: 'bg-cyan-900'
      },
      slots: {
        chip: () => h(Chip, { text: '月曜日', iconType: 'calendar' })
      }
    })

    expect(wrapper.find(`[data-testId="slotChips"]`).exists()).toBe(true)
  })
})
