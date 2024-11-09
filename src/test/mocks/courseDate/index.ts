export interface CourseDateRequestBody {
  course_date: {
    course_number: string
    course_date: string
  }
}

export const EXPECTED_CREATE_COURSE_DATE = {
  id: 1,
  course_id: 1,
  course_number: '第1回',
  course_date: '2024/4/1',
  is_reflection: true
}

export const MOCK_COURSE_DATES = [
  {
    id: 1,
    course_id: 1,
    course_number: '第1回',
    course_date: '2024/4/1',
    is_reflection: true
  },
  {
    id: 2,
    course_id: 1,
    course_number: '第2回',
    course_date: '2024/4/8',
    is_reflection: false
  },
  {
    id: 3,
    course_id: 1,
    course_number: '第3回',
    course_date: '2024/4/15',
    is_reflection: true
  },
  {
    id: 4,
    course_id: 1,
    course_number: '第4回',
    course_date: '2024/4/22',
    is_reflection: false
  },
  {
    id: 5,
    course_id: 1,
    course_number: '第5回',
    course_date: '2024/4/29',
    is_reflection: true
  }
]
