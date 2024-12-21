export default defineNuxtRouteMiddleware(async () => {
  const { userInfo } = useUserApi()

  if (userInfo.value?.user.user_type !== 1) {
    return await navigateTo('/')
  }
})
