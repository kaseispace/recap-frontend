export const mockCoursesData = [
  {
    id: 1,
    name: '数学',
    teacher_name: '山田',
    day_of_week: '月曜日',
    course_time: '1限',
    uuid: '3e25d276-da75-4b8f-97fa-10ed3df0c1a6',
    course_code: 'mATH101'
  },
  {
    id: 2,
    name: '英語',
    teacher_name: '佐藤',
    day_of_week: '火曜日',
    course_time: '2限',
    uuid: '6dcd4ce8-d0f6-4a9d-b36d-8fe6500d384f',
    course_code: 'eNg102'
  },
  {
    id: 3,
    name: '物理',
    teacher_name: '鈴木',
    day_of_week: '水曜日',
    course_time: '3限',
    uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    course_code: 'PhY103'
  },
  {
    id: 4,
    name: '化学',
    teacher_name: '高橋',
    day_of_week: '木曜日',
    course_time: '4限',
    uuid: '5e8f1602-0a44-4a3e-b765-baacf5e4d4a1',
    course_code: 'che104'
  },
  {
    id: 5,
    name: '生物',
    teacher_name: '田中',
    day_of_week: '金曜日',
    course_time: '5限',
    uuid: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
    course_code: 'BIO105'
  }
]

export const mockCoursesDataWithError = [
  {
    id: 1,
    name: 'コンピュータサイエンス入門',
    teacher_name: '佐藤',
    day_of_week: '火曜日',
    course_time: '2限',
    uuid: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    course_code: 'aB3dE7f'
  },
  {
    id: 2,
    name: '経済学基礎',
    teacher_name: '鈴木',
    day_of_week: '水曜日',
    course_time: '3限',
    uuid: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7',
    course_code: 'G6hJk2L'
  },
  {
    id: 3,
    name: '心理学概論',
    teacher_name: '田中',
    day_of_week: '木曜日',
    course_time: '4限',
    uuid: 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8',
    course_code: 'mN4pQ8r'
  },
  {
    id: 4,
    name: '物理学入門',
    teacher_name: '高橋',
    day_of_week: '金曜日',
    course_time: '5限',
    uuid: 'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9',
    course_code: 'sT5uV9w'
  },
  {
    id: 5,
    name: '文学概論',
    teacher_name: '中村',
    day_of_week: '月曜日',
    course_time: '2限',
    uuid: 'e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0',
    course_code: 'X1yZ2aB'
  }
]

export const mockTeacherCourseData = [
  {
    id: 1,
    name: '英語',
    teacher_name: '佐藤',
    day_of_week: '火曜日',
    course_time: '2限',
    uuid: '6dcd4ce8-d0f6-4a9d-b36d-8fe6500d384f',
    course_code: 'eNg102'
  }
]

export const mockStudentCourseData = [
  {
    name: '数学',
    teacher_name: '山田',
    day_of_week: '月曜日',
    course_time: '1限',
    uuid: '3e25d276-da75-4b8f-97fa-10ed3df0c1a6'
  }
]

export const mockStudentCoursesDataWithError = [
  {
    name: '国際関係論',
    teacher_name: '中村',
    day_of_week: '金曜日',
    course_time: '1限',
    uuid: '3e25d276-da75-4b8f-97fa-10ed3df0c1a6'
  },
  {
    name: 'マーケティング戦略',
    teacher_name: '高橋',
    day_of_week: '火曜日',
    course_time: '3限',
    uuid: '4f36e387-eb86-5c9f-a8fb-21fe4ef1d2b7'
  },
  {
    name: '人工知能と機械学習',
    teacher_name: '伊藤',
    day_of_week: '水曜日',
    course_time: '4限',
    uuid: '5g47f498-fc97-6d0g-b9gc-32gf5gh2e3c8'
  },
  {
    name: '現代社会とメディア',
    teacher_name: '松本',
    day_of_week: '木曜日',
    course_time: '1限',
    uuid: '6h58g509-gd08-7e1h-c0hd-43hg6hi3f4d9'
  },
  {
    name: 'デジタル時代のコミュニケーションとメディア',
    teacher_name: '藤田',
    day_of_week: '金曜日',
    course_time: '3限',
    uuid: '7i69h610-he19-8f2i-d1ie-54ih7ij4g5e0'
  }
]

export const mockStudentCoursesData = [
  {
    name: 'データサイエンス入門',
    teacher_name: '田中',
    day_of_week: '木曜日',
    course_time: '1限',
    uuid: 'a3b4c5d6-e7f8-9g0h-i1j2-3k4l5m6n7o8p'
  },
  {
    name: '心理学基礎',
    teacher_name: '中村',
    day_of_week: '水曜日',
    course_time: '3限',
    uuid: 'q9r8s7t6-u5v4-w3x2-y1z0-1a2b3c4d5e6f'
  },
  {
    name: '国際経済学',
    teacher_name: '鈴木',
    day_of_week: '木曜日',
    course_time: '4限',
    uuid: 'g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2'
  },
  {
    name: '日本史概論',
    teacher_name: '松本',
    day_of_week: '金曜日',
    course_time: '1限',
    uuid: 'w3x4y5z6-a7b8-c9d0-e1f2-g3h4i5j6k7l8'
  },
  {
    name: '環境科学と持続可能性',
    teacher_name: '山田',
    day_of_week: '月曜日',
    course_time: '3限',
    uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  }
]

export const mockJoinedCourseData = {
  name: '解析学',
  teacher_name: '佐々木',
  day_of_week: '火曜日',
  course_time: '3限',
  uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
}

export const courseUuid = '3e25d276-da75-4b8f-97fa-10ed3df0c1a6'

export const mockJoinedUsers = [
  { id: 1, name: '山田花子' },
  { id: 2, name: '鈴木一郎' },
  { id: 3, name: '高橋次郎' },
  { id: 4, name: '伊藤三郎' },
  { id: 5, name: '渡辺四郎' }
]
