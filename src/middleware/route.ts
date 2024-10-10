export default defineNuxtRouteMiddleware(async () => {
  console.log('middleware:route')
  const { logout } = useAuth()
  const { userInfo } = useUserApi()

  // ルートに来たときにuserInfoがあるなら、ログイン中なのでマイページへ遷移
  // 取得したユーザー権限に従い、マイページへ誘導
  // 予期せず、userType.valueが0/1以外の場合はfirebaseからログアウト

  console.log('権限', userInfo.value)

  // userInfoがnullの場合、デフォルトが処理される
  switch (userInfo.value?.user.user_type) {
    case 1:
      return await navigateTo('/teacher')
    case 0:
      return await navigateTo('/student')
    default:
      await logout()
  }
})
