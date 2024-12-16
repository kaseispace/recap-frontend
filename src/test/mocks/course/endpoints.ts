import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { readBody } from 'h3'
import { MOCK_TEACHER_COURSE, MOCK_JOINED_USERS } from '@/test/mocks/course/index'

const config = useRuntimeConfig()
const uuid = '3e25d276-da75-4b8f-97fa-10ed3df0c1a6'
const courseUuid = '6dcd4ce8-d0f6-4a9d-b36d-8fe6500d384f'
const generatedUuid = '123e4567-e89b-12d3-a456-426614174000'
const generatedCourseCode = 'aBc103'

export const registerCourseEndpoints = () => {
  // 担当授業
  registerEndpoint(`${config.public.backendUrl}/courses`, {
    method: 'GET',
    handler: () => {
      return MOCK_TEACHER_COURSE
    }
  })

  // 授業の作成
  registerEndpoint(`${config.public.backendUrl}/courses`, {
    method: 'POST',
    handler: async (event) => {
      const body = await readBody<Course>(event)
      return {
        id: 1,
        name: body.name,
        teacher_name: body.teacher_name,
        day_of_week: body.day_of_week,
        course_time: body.course_time,
        uuid: generatedUuid,
        course_code: generatedCourseCode
      }
    }
  })

  // 授業の編集
  registerEndpoint(`${config.public.backendUrl}/courses/${uuid}`, {
    method: 'PUT',
    handler: async (event) => {
      const course = useCourseApi()
      const body = await readBody<Course>(event)
      if (course.teacherCourses.value) {
        return {
          id: 1,
          name: body.name,
          teacher_name: body.teacher_name,
          day_of_week: body.day_of_week,
          course_time: body.course_time,
          uuid: course.teacherCourses.value[0].uuid,
          course_code: course.teacherCourses.value[0].course_code
        }
      }
    }
  })

  // 授業の削除
  registerEndpoint(`${config.public.backendUrl}/courses/${uuid}`, {
    method: 'DELETE',
    handler: () => {
      const course = useCourseApi()
      const deleteCourse = course.teacherCourses.value?.find(course => course.uuid === uuid)
      if (deleteCourse) {
        return {}
      }
    }
  })
}

export const registerCourseAdditionalEndpoints = () => {
  registerEndpoint(`${config.public.backendUrl}/courses/${courseUuid}`, {
    method: 'GET',
    handler: () => {
      return MOCK_TEACHER_COURSE
    }
  })

  registerEndpoint(`${config.public.backendUrl}/courses/${courseUuid}/joined_users`, {
    method: 'GET',
    handler: () => {
      return MOCK_JOINED_USERS
    }
  })
}
