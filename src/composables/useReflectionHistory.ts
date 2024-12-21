export const useReflectionHistory = () => {
  const dailyCourseReflections = useState<DailyCourseReflection[] | null>('dailyCourseReflections', () => null)
  const userHistory = useState<CourseUserReflections | undefined>('userHistory')

  const checkReflections = (course: DailyCourseReflection, user: SimplifiedUser) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(course.course_date)

    if (course.is_reflection === false) {
      return 'reflectionNotHeld'
    }

    if (checkDate <= today) {
      const userReflection = course.users_reflections.find(reflection => reflection.id === user.id)
      return userReflection && userReflection.reflections.length > 0 ? 'filledIn' : 'notFilledIn'
    }
    else {
      return 'courseNotHeld'
    }
  }

  const convertDateFormat = (date: string) => {
    return date.substring(5)
  }

  return { dailyCourseReflections, userHistory, checkReflections, convertDateFormat }
}
