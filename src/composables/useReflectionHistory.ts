export const useReflectionHistory = () => {
  const dailyCourseReflections = useState<DailyCourseReflection[] | null>('dailyCourseReflections', () => null)
  // 教員が各学生の振り返りをみる用
  const userHistory = useState<CourseUserReflections | undefined>('userHistory')

  // 振り返りが既に登録済みであるかどうか
  const checkReflections = (course: DailyCourseReflection, user: SimplifiedUser) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(course.course_date)

    // 振り返りの実施があるかどうかを先に確認
    if (course.is_reflection === false) {
      return 'reflectionNotHeld'
    }

    // 振り返りの実施がある場合は以降の処理
    if (checkDate <= today) {
      // ここでは既に授業日を向かえている
      // 引数で受け取ったcourseからusers_reflectionsを探索
      const userReflection = course.users_reflections.find(reflection => reflection.id === user.id)
      return userReflection && userReflection.reflections.length > 0 ? 'filledIn' : 'notFilledIn'
    }
    else {
      // まだ授業日が来ていない
      return 'courseNotHeld'
    }
  }

  // 日付文字列（'2024/6/17'）を先頭から5番目までを削除した文字列を返す（'6/17'）
  // 現時点では使っていない
  const convertDateFormat = (date: string) => {
    return date.substring(5)
  }

  return { dailyCourseReflections, userHistory, checkReflections, convertDateFormat }
}
