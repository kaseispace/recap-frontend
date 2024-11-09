// @vitest-environment nuxt
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import IconMenuList from '@/components/Base/Layout/IconMenuList.vue'
import { mockCoursesData } from '@/test/mocks/course/index'

mockNuxtImport('useRoute', () => {
  return () => ({
    params: {
      id: '6dcd4ce8-d0f6-4a9d-b36d-8fe6500d384f'
    },
    name: 'student-course-id'
  })
})

describe('IconMenuListコンポーネントのテスト', () => {
  it('初期表示はメニューリストが表示されていない', async () => {
    const wrapper = await mountSuspended(IconMenuList, {
      props: {
        courses: mockCoursesData,
        title: '受講一覧',
        courseName: STUDENT_COURSE_DETAIL,
        activeBg: 'bg-cyan-600/40',
        listActiveBg: 'bg-cyan-600/10 text-cyan-900',
        inactiveBg: 'hover:bg-cyan-600/10',
        listInactiveBg: 'hover:bg-slate-100 text-gray-500 hover:text-black'
      }
    })

    expect(wrapper.find(`[data-testId="menuList"]`).exists()).toBe(false)
  })

  it('propsで値が渡された場合、正しく値が適用される', async () => {
    const wrapper = await mountSuspended(IconMenuList, {
      props: {
        courses: mockCoursesData,
        title: '受講一覧',
        courseName: STUDENT_COURSE_DETAIL,
        activeBg: 'bg-cyan-600/40',
        listActiveBg: 'bg-cyan-600/10 text-cyan-900',
        inactiveBg: 'hover:bg-cyan-600/10',
        listInactiveBg: 'hover:bg-slate-100 text-gray-500 hover:text-black'
      }
    })

    expect(wrapper.get(`[data-testId="toggle"]`).attributes().class).toContain('bg-cyan-600/40')

    await wrapper.get(`[data-testId="toggle"]`).trigger('click')

    expect(wrapper.find(`[data-testId="menuList"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testId="title"]`).text()).toBe('受講一覧')

    for (let i = 0; i < mockCoursesData.length; i++) {
      expect(wrapper.find(`[data-testId="menuList"]`).text()).toContain(mockCoursesData[i].name)
      expect(wrapper.find(`[data-testId="link-${i}"]`).attributes('href')).toBe(
        `/student/course/${mockCoursesData[i].uuid}`
      )

      if (mockCoursesData[i].uuid === '6dcd4ce8-d0f6-4a9d-b36d-8fe6500d384f') {
        expect(wrapper.get(`[data-testId="propsBgColor-${i}"]`).classes()).toEqual(
          expect.arrayContaining(['bg-cyan-600/10', 'text-cyan-900'])
        )
        expect(wrapper.get(`[data-testId="propsBgColor-${i}"]`).classes()).not.toEqual(
          expect.arrayContaining(['hover:bg-slate-100', 'text-gray-500', 'hover:text-black'])
        )
      }
      else {
        expect(wrapper.get(`[data-testId="propsBgColor-${i}"]`).classes()).toEqual(
          expect.arrayContaining(['hover:bg-slate-100', 'text-gray-500', 'hover:text-black'])
        )
        expect(wrapper.get(`[data-testId="propsBgColor-${i}"]`).classes()).not.toEqual(
          expect.arrayContaining(['bg-cyan-600/10', 'text-cyan-900'])
        )
      }
    }
  })
})
