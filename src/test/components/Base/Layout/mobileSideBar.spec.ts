// @vitest-environment nuxt
import { mockNuxtImport, mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import MobileSideBar from '@/components/Base/Layout/MobileSideBar.vue'
import { mockCoursesData } from '@/test/mocks/course/index'

mockNuxtImport('useRoute', () => {
  return () => ({
    params: {
      id: '6dcd4ce8-d0f6-4a9d-b36d-8fe6500d384f'
    },
    name: 'student-course-id'
  })
})

mockComponent('Icon', {
  template: '<div>stub icon</div>'
})

describe('MobileSideBarコンポーネントのテスト', () => {
  it('初期表示はダイアログは表示されていない', async () => {
    const wrapper = await mountSuspended(MobileSideBar, {
      props: {
        courses: mockCoursesData,
        title: '受講一覧',
        courseName: STUDENT_COURSE_DETAIL,
        listActiveBg: 'bg-cyan-600/10 text-cyan-900',
        listInactiveBg: 'hover:bg-slate-100 text-gray-500 hover:text-black',
        pathName: 'student'
      }
    })

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(false)
  })

  it('参加中の授業のナビゲーションメニューが表示される', async () => {
    const wrapper = await mountSuspended(MobileSideBar, {
      props: {
        courses: mockCoursesData,
        title: '受講一覧',
        courseName: STUDENT_COURSE_DETAIL,
        listActiveBg: 'bg-cyan-600/10 text-cyan-900',
        listInactiveBg: 'hover:bg-slate-100 text-gray-500 hover:text-black',
        pathName: 'student'
      }
    })

    await wrapper.get(`[data-testId="button"]`).trigger('click')

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testId="home"]`).classes()).toEqual(
      expect.arrayContaining(['hover:bg-slate-100', 'text-gray-500', 'hover:text-black'])
    )
    expect(wrapper.find(`[data-testId="home"]`).classes()).not.toEqual(
      expect.arrayContaining(['bg-cyan-600/10', 'text-cyan-900'])
    )
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

  it('参加中の授業が存在しない場合、ナビゲーションメニューに「なし」と表示される', async () => {
    const wrapper = await mountSuspended(MobileSideBar, {
      props: {
        courses: [],
        title: '受講一覧',
        courseName: STUDENT_COURSE_DETAIL,
        listActiveBg: 'bg-cyan-600/10 text-cyan-900',
        listInactiveBg: 'hover:bg-slate-100 text-gray-500 hover:text-black',
        pathName: 'student'
      }
    })

    await wrapper.get(`[data-testId="button"]`).trigger('click')

    expect(wrapper.find(`[data-testId="dialog"]`).exists()).toBe(true)
    expect(wrapper.find(`[data-testId='noJoinCourse']`).text()).toBe('なし')
  })
})
