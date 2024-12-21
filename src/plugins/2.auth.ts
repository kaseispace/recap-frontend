export default defineNuxtPlugin(async () => {
  const { checkAuthState } = useAuth()

  await checkAuthState()
})
