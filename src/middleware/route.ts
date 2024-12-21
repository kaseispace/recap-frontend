export default defineNuxtRouteMiddleware(async () => {
  const { logout } = useAuth()
  const { userInfo } = useUserApi()

  switch (userInfo.value?.user.user_type) {
    case 1:
      return await navigateTo('/teacher')
    case 0:
      return await navigateTo('/student')
    default:
      await logout()
  }
})
