export default defineNuxtRouteMiddleware(async () => {
  const { userInfo } = useUserApi()

  // 教師権限がない場合
  if (userInfo.value?.user.user_type !== 1) {
    console.log('教師じゃないよ')
    return await navigateTo('/')
  }
})
