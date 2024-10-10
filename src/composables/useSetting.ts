export const useSetting = () => {
  const nextCourseDate = useState<CourseDate | undefined>('nextCourseDate', () => undefined)

  const findNextCourseDate = (courseDates: CourseDate[]) => {
    const today = new Date(Date.now())
    today.setHours(0, 0, 0, 0)
    if (courseDates) {
      return courseDates.find((course) => {
        const courseDate = new Date(course.course_date)
        courseDate.setHours(0, 0, 0, 0)
        return courseDate >= today
      })
    }
  }
  return { nextCourseDate, findNextCourseDate }
}
