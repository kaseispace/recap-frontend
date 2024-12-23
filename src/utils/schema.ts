import * as yup from 'yup'

export const LoginFormSchema = yup.object({
  email: yup.string().required('必須項目です').email('メールアドレスの形式で入力してください'),
  password: yup.string().required('必須項目です')
})

export const SignUpFormSchema = yup.object({
  name: yup.string().trim().required('必須項目です'),
  email: yup.string().trim().required('必須項目です').email('メールアドレスの形式で入力してください'),
  password: yup
    .string()
    .trim()
    .required('必須項目です')
    .test('no-spaces', 'パスワードに空白を含めることはできません', value => value !== undefined && !/\s/.test(value))
    .min(8, '8文字以上で入力してください'),
  passwordConfirm: yup
    .string()
    .trim()
    .required('必須項目です')
    .oneOf([yup.ref('password')], 'パスワードが一致しません'),
  roleText: yup.string().required('必須項目です'),
  schoolName: yup.string().required('必須項目です')
})

export const CourseFormSchema = yup.object({
  name: yup.string().trim().required('必須項目です'),
  teacherName: yup.string().trim().required('必須項目です'),
  dayOfWeek: yup.string().required('必須項目です'),
  courseTime: yup.string().required('必須項目です')
})

export const CourseDateSchema = yup.object({
  courseSession: yup.string().trim().required('必須項目です').matches(/^\d+$/, '半角数字を入力してください'),
  courseDate: yup.string().required('必須項目です')
})

export const CourseCodeSchema = yup.object({
  courseCode: yup.string().required('必須項目です')
})

export const AnnouncementSchema = yup.object({
  content: yup.string().trim().required('必須項目です')
})

export const PromptSchema = yup.object({
  title: yup.string().trim().required('必須項目です'),
  content: yup.string().trim().required('必須項目です')
})

export const ReflectionSchema = yup.object({
  message: yup.string().trim().required('必須項目です')
})

export const PasswordResetSchema = yup.object({
  email: yup.string().trim().required('必須項目です').email('メールアドレスの形式で入力してください')
})

export const AccountDeletionSchema = yup.object({
  password: yup.string().required('必須項目です')
})
