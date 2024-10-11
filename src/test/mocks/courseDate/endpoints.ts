import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { readBody } from 'h3'
import type { CourseDateRequestBody } from '@/test/mocks/courseDate/index'

const config = useRuntimeConfig()

export const registerCourseDateEndpoints = () => {
  // 授業日の追加
  registerEndpoint(`${config.public.devBackendUrl}/course_dates`, {
    method: 'POST',
    handler: async (event) => {
      const body = await readBody<CourseDateRequestBody>(event)
      return {
        id: 1,
        course_id: 1,
        course_number: body.course_date.course_number,
        course_date: body.course_date.course_date,
        is_reflection: true
      }
    }
  })

  // 授業日の振り返り有無の更新
  registerEndpoint(`${config.public.devBackendUrl}/course_dates/5/reflection_status`, {
    method: 'PATCH',
    handler: () => {
      const setting = useSetting()
      return {
        id: 5,
        course_id: 1,
        course_number: setting.nextCourseDate.value?.course_number,
        course_date: setting.nextCourseDate.value?.course_date,
        is_reflection: !setting.nextCourseDate.value?.is_reflection
      }
    }
  })

  // 授業日の編集
  registerEndpoint(`${config.public.devBackendUrl}/course_dates/5`, {
    method: 'PATCH',
    handler: async (event) => {
      const body = await readBody<CourseDateRequestBody>(event)
      return {
        id: 5,
        course_id: 1,
        course_number: body.course_date.course_number,
        course_date: body.course_date.course_date,
        is_reflection: true
      }
    }
  })

  // 授業日の削除
  registerEndpoint(`${config.public.devBackendUrl}/course_dates/5`, {
    method: 'DELETE',
    handler: () => {
      const courseDates = useCourseDateApi()
      const setting = useSetting()
      const deleteCourseDate = courseDates.courseDates.value?.find(
        courseDate => courseDate.id === setting.nextCourseDate.value?.id
      )
      if (deleteCourseDate) {
        return {}
      }
    }
  })
}
