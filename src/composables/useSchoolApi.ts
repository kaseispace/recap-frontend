export const useSchoolApi = () => {
  const config = useRuntimeConfig()
  const schoolInfo = useState<University[] | null>('schoolInfo', () => null)

  const getSchool = async (): Promise<University[]> => {
    const data = await $fetch<University[]>(`${config.public.backendUrl}/schools`)
    return data
  }

  return { schoolInfo, getSchool }
}
