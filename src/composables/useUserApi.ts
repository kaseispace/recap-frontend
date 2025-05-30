export const useUserApi = () => {
  const config = useRuntimeConfig()
  const userInfo = useState<UserSchool | null>('userInfo', () => null)

  const createUser = async (name: string, accountType: number, idToken: string): Promise<User> => {
    const requestBody = { name, user_type: accountType }
    const data = await $fetch<User>(`${config.public.backendUrl}/users`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody
    })
    return data
  }

  const deleteUser = async (uid: string, idToken: string) => {
    const data = await $fetch(`${config.public.backendUrl}/users/${uid}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${idToken}` }
    })
    return data
  }

  const registerSchool = async (schoolId: number, idToken: string): Promise<UserSchool> => {
    const requestBody = { school_id: schoolId }
    const data = await $fetch<UserSchool>(`${config.public.backendUrl}/user_schools`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody
    })
    return data
  }

  const getUserSchool = async (idToken: string): Promise<UserSchool> => {
    const data = await $fetch<UserSchool>(`${config.public.backendUrl}/user_schools`, {
      headers: { Authorization: `Bearer ${idToken}` }
    })
    return data
  }

  return { userInfo, createUser, deleteUser, registerSchool, getUserSchool }
}
