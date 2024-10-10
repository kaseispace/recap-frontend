export const useUserApi = () => {
  const config = useRuntimeConfig()
  const userInfo = useState<UserSchool | null>('userInfo', () => null)

  // バックエンドにユーザーの新規登録、stateには保存しない
  const createUser = async (name: string, accountType: number, idToken: string): Promise<User> => {
    const requestBody = { name, user_type: accountType }
    const data = await $fetch<User>(`${config.public.devBackendUrl}/users`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody,
    })
    return data
  }

  const deleteUser = async (uid: string, idToken: string) => {
    const data = await $fetch(`${config.public.devBackendUrl}/users/${uid}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${idToken}` },
    })
    return data
  }

  // ユーザーの学校を登録
  const registerSchool = async (schoolId: number, idToken: string): Promise<UserSchool> => {
    const requestBody = { school_id: schoolId }
    const data = await $fetch<UserSchool>(`${config.public.devBackendUrl}/user_schools`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody,
    })
    return data
  }

  // ユーザー情報を取得、stateには保存しない
  const getUserSchool = async (idToken: string): Promise<UserSchool> => {
    const data = await $fetch<UserSchool>(`${config.public.devBackendUrl}/user_schools`, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
    console.log('ユーザーデータの取得完了')
    return data
  }

  return { userInfo, createUser, deleteUser, registerSchool, getUserSchool }
}
