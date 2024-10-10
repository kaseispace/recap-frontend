import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import type { User as firebaseUser } from 'firebase/auth'

export const useAuth = () => {
  const { $firebaseAuth } = useNuxtApp()
  const { userInfo, getUserSchool } = useUserApi()
  // user保持用
  const authUser = useState<firebaseUser | null>('user', () => null)

  // firebaseにログイン
  // ここではstateに保存しないでuserを返すだけ
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

  // firebaseに新規登録
  // ここではstateに保存しないでuserを返すだけ
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

  // firebaseからログアウト
  // stateの初期化
  const logout = async () => {
    // 先にstate,cookie等を初期化
    userInfo.value = null
    authUser.value = null
    await signOut($firebaseAuth)
    await navigateTo('/')
  }

  // firebaseへのログイン状態を管理
  // ログイン中なら、ユーザー情報を更新
  const checkAuthState = async () => {
    if (import.meta.client) {
      return await new Promise<void>((resolve, reject) => {
        onAuthStateChanged($firebaseAuth, async (user) => {
          try {
            if (user) {
              console.log('firebaseにログイン中です')
              authUser.value = user
              const token = await user.getIdToken()
              userInfo.value = await getUserSchool(token)
            }
            else {
              console.log('firebaseにログインしていません、リセットします')
            }
          }
          catch (error) {
            console.error('エラーが発生しました:', error)
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
