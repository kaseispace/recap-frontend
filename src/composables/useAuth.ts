import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import type { User as firebaseUser } from 'firebase/auth'

export const useAuth = () => {
  const { $firebaseAuth } = useNuxtApp()
  const { userInfo, getUserSchool } = useUserApi()
  const authUser = useState<firebaseUser | null>('user', () => null)

  const login = async (email: string, password: string): Promise<firebaseUser | null> => {
    try {
      const { user } = await signInWithEmailAndPassword($firebaseAuth, email, password)
      return user
    }
    catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw error
      }
      return null
    }
  }

  const signup = async (email: string, password: string): Promise<firebaseUser | null> => {
    try {
      const { user } = await createUserWithEmailAndPassword($firebaseAuth, email, password)
      return user
    }
    catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw error
      }
      return null
    }
  }

  const logout = async () => {
    userInfo.value = null
    authUser.value = null
    await signOut($firebaseAuth)
    await navigateTo('/')
  }

  const checkAuthState = async () => {
    if (import.meta.client) {
      return await new Promise<void>((resolve, reject) => {
        onAuthStateChanged($firebaseAuth, async (user) => {
          try {
            if (user) {
              authUser.value = user
              const token = await user.getIdToken()
              userInfo.value = await getUserSchool(token)
            }
          }
          catch (error) {
            reject(error)
          }
          finally {
            resolve()
          }
        })
      })
    }
  }

  return { authUser, login, signup, logout, checkAuthState }
}
