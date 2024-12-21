export default defineNuxtRouteMiddleware(async () => {
  const { userInfo } = useUserApi()

  if (userInfo.value?.user.user_type !== 0) {
    return await navigateTo('/')
  }
})
