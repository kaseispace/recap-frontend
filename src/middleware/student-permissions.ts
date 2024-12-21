export default defineNuxtRouteMiddleware(async () => {
  const { userInfo } = useUserApi()

  // 学生権限がない場合
  // ルートに戻せば、ルートガードが起動してマイページに戻る
  if (userInfo.value?.user.user_type !== 0) {
    return await navigateTo('/')
  }
})
