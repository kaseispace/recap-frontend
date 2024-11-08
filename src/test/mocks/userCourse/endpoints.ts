import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { readBody } from 'h3'
import { mockCoursesData, courseUuid, mockJoinedCourseData } from '@/test/mocks/course/index'
import type { userCourseRequestBody } from '@/test/mocks/userCourse'

const config = useRuntimeConfig()
const uuid = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

export const registerUserCourseEndpoints = () => {
  // 授業への参加
  registerEndpoint(`${config.public.backendUrl}/user_courses`, {
    method: 'POST',
    handler: async (event) => {
      const body = await readBody<userCourseRequestBody>(event)
      const course = mockCoursesData.find(course => course.course_code === body.course_code)
      return {
        name: course?.name,
        teacher_name: course?.teacher_name,
        day_of_week: course?.day_of_week,
        course_time: course?.course_time,
        uuid: course?.uuid
      }
    }
  })

  // 授業から退出
  registerEndpoint(`${config.public.backendUrl}/user_courses/${courseUuid}`, {
    method: 'DELETE',
    handler: () => {
      const userCourse = useUserCourseApi()
      const deleteCourse = userCourse.studentCourses.value?.find(course => course.uuid === courseUuid)
      if (deleteCourse) {
        return {}
      }
    }
  })
}

export const registerUserCourseAdditionalEndpoints = () => {
  // uuidに一致する授業を返す
  registerEndpoint(`${config.public.backendUrl}/user_courses/${uuid}`, {
    method: 'GET',
    handler: () => {
      return mockJoinedCourseData
    }
  })
}
