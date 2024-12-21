export default defineNuxtRouteMiddleware(async () => {
  const { userInfo } = useUserApi()

  // 教師権限がない場合
  if (userInfo.value?.user.user_type !== 1) {
    return await navigateTo('/')
  }
})
