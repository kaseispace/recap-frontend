export interface userCourseRequestBody {
  school_id: number
  course_code: string
}

export interface userCourse {
  user_id: number
  course_id: number
}

export const MOCK_USER_COURSES = [
  { id: 1, user_id: 1, course_id: 1 },
  { id: 1, user_id: 1, course_id: 2 },
  { id: 1, user_id: 1, course_id: 3 },
  { id: 1, user_id: 1, course_id: 4 },
  { id: 1, user_id: 1, course_id: 5 }
]
