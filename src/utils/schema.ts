import * as yup from 'yup'

// useField関数の第1引数と結びつく（schemaのプロパティ名とuseField関数の第1引数を合致させる）
export const LoginFormSchema = yup.object({
  email: yup.string().required('必須項目です').email('メールアドレスの形式で入力してください'),
  password: yup.string().required('必須項目です'),
})

export const SignUpFormSchema = yup.object({
  name: yup.string().required('必須項目です'),
  email: yup.string().required('必須項目です').email('メールアドレスの形式で入力してください'),
  password: yup.string().required('必須項目です').min(8, '8文字以上で入力してください'),
  passwordConfirm: yup
    .string()
    .required('必須項目です')
    .oneOf([yup.ref('password')], 'パスワードが一致しません'),
  roleText: yup.string().required('必須項目です'),
  schoolName: yup.string().required('必須項目です'),
})

export const CourseFormSchema = yup.object({
  name: yup.string().required('必須項目です'),
  teacherName: yup.string().required('必須項目です'),
  dayOfWeek: yup.string().required('必須項目です'),
  courseTime: yup.string().required('必須項目です'),
})

export const CourseDateSchema = yup.object({
  courseSession: yup.string().required('必須項目です').matches(/^\d+$/, '半角数字を入力してください'),
  courseDate: yup.string().required('必須項目です'),
})

export const CourseCodeSchema = yup.object({
  courseCode: yup.string().required('必須項目です'),
})

export const AnnouncementSchema = yup.object({
  content: yup.string().required('必須項目です'),
})

export const PromptSchema = yup.object({
  title: yup.string().required('必須項目です'),
  content: yup.string().required('必須項目です'),
})

export const ReflectionSchema = yup.object({
  message: yup.string().required('必須項目です'),
})

export const PasswordResetSchema = yup.object({
  email: yup.string().required('必須項目です').email('メールアドレスの形式で入力してください'),
})
