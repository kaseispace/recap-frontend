export default defineNuxtPlugin(async () => {
  console.log('plugins:auth')
  const { checkAuthState } = useAuth()

  await checkAuthState()
})
