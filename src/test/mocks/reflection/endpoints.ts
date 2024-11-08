import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { readBody } from 'h3'
import { emptyDataUUID, dataUUID } from '@/test/mocks/index'
import { mockStudentReflectionsData } from '@/test/mocks/reflection/index'
import type { createReflectionRequestBody, updateReflectionRequestBody } from '@/test/mocks/reflection/index'

const config = useRuntimeConfig()

export const registerReflectionEndpoints = () => {
  registerEndpoint(`${config.public.backendUrl}/reflections/student_reflections?uuid=${emptyDataUUID}`, {
    method: 'GET',
    handler: () => {
      return []
    }
  })

  registerEndpoint(`${config.public.backendUrl}/reflections/student_reflections?uuid=${dataUUID}`, {
    method: 'GET',
    handler: () => {
      return mockStudentReflectionsData
    }
  })

  // 振り返りの登録
  registerEndpoint(`${config.public.backendUrl}/reflections`, {
    method: 'POST',
    handler: async (event) => {
      const courseDate = useCourseDateApi()
      const body = await readBody<createReflectionRequestBody>(event)
      const reflections: Reflection[] = []
      const startingId = 15
      for (let i = 0; i < body.reflection.reflections.length; i++) {
        reflections.push({
          id: startingId + i,
          course_date_id: body.reflection.course_date_id,
          message: body.reflection.reflections[i].message,
          message_type: body.reflection.reflections[i].message_type,
          message_time: body.reflection.reflections[i].message_time
        })
      }
      return [
        {
          id: 3,
          course_id: courseDate.todayCourseDate.value?.course_id,
          course_number: courseDate.todayCourseDate.value?.course_number,
          course_date: courseDate.todayCourseDate.value?.course_date,
          is_reflection: courseDate.todayCourseDate.value?.is_reflection,
          reflections
        }
      ]
    }
  })

  // 振り返りの編集
  registerEndpoint(`${config.public.backendUrl}/reflections/4`, {
    method: 'PATCH',
    handler: async (event) => {
      const reflection = useReflectionApi()
      const body = await readBody<updateReflectionRequestBody>(event)
      if (reflection.studentReflections.value) {
        for (const data of reflection.studentReflections.value) {
          const foundReflection = data.reflections.find(reflection => reflection.id === 4)
          if (foundReflection) {
            return {
              id: foundReflection.id,
              course_date_id: foundReflection.course_date_id,
              message_type: foundReflection.message_type,
              message: body.message,
              message_time: foundReflection.message_time
            }
          }
        }
      }
    }
  })
}
