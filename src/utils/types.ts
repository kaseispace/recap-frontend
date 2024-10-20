// ユーザー型
export interface User {
  id: number
  uid: string
  name: string
  user_type: number
}

export type SimplifiedUser = Omit<User, 'uid' | 'user_type'>

// 学校型
export interface University {
  id: number
  name: string
}

// ユーザーの所属型
export interface UserSchool {
  user: User
  school: University
}

// 授業型
export interface Course {
  id: number
  uuid: string
  course_code: string
  name: string
  teacher_name: string
  day_of_week: string
  course_time: string
}

// 授業日型
export interface CourseDate {
  id: number
  course_id: number
  course_number: string
  course_date: string
  is_reflection: boolean
}

export interface StudentCourse {
  name: string
  teacher_name: string
  day_of_week: string
  course_time: string
  uuid: string
}

// お知らせ型
export interface Announcement {
  id: number
  content: string
  created_at: string
  updated_at: string
}

export interface PromptContent {
  id?: number
  content: string
  _destroy?: boolean
}

// プロンプト型
export interface Prompt {
  id: number
  title: string
  active: boolean
  prompt_questions: PromptContent[]
}

// 振り返り型
export interface Reflection {
  id: number
  course_date_id: number
  message_type: string
  message: string
  message_time: number
}

// フィードバック型
export interface Feedback {
  id: number
  user_id: number
  course_id: number
  course_date_id: number
  comment: string
}

// ユーザー自身の登録した振り返り全て
export interface StudentCourseReflection extends CourseDate {
  reflections: Reflection[]
}

// ユーザーがその日に作成した振り返り
export interface UserReflections {
  id: number
  name: string
  reflections: Reflection[]
}

// その日に作成された授業内すべての振り返り
export interface DailyCourseReflection extends CourseDate {
  users_reflections: UserReflections[]
}

// 授業内全ての振り返り
export interface CourseReflections {
  course_date: DailyCourseReflection
}

// 各ユーザーの振り返り（教員が振り返りの詳細をみる）
export interface CourseUserReflections {
  user_id: number
  name: string
  user_reflections: StudentCourseReflection[]
}

// isLoadingはチャット画面で使うようにオプショナル
export interface ChatMessage {
  message_type: 'bot' | 'user'
  message: string
  message_time: number
  isLoading?: boolean
}

// 汎用オブジェクト型
export interface ValueText {
  value: number
  text: string
}

// composableの戻り値の型
export type AnnouncementApiReturnType = ReturnType<typeof useAnnouncementApi>
export type AuthReturnType = ReturnType<typeof useAuth>
export type ChatReturnType = ReturnType<typeof useChat>
export type CourseApiReturnType = ReturnType<typeof useCourseApi>
export type CourseDateApiReturnType = ReturnType<typeof useCourseDateApi>
export type FeedbackApiReturnType = ReturnType<typeof useFeedbackApi>
export type PromptApiReturnType = ReturnType<typeof usePromptApi>
export type ReflectionApiReturnType = ReturnType<typeof useReflectionApi>
export type ReflectionHistoryReturnType = ReturnType<typeof useReflectionHistory>
export type SettingReturnType = ReturnType<typeof useSetting>
export type UserApiReturnType = ReturnType<typeof useUserApi>
export type UserCourseReturnType = ReturnType<typeof useUserCourseApi>
