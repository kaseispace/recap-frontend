<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { FirebaseError } from 'firebase/app'
import { useAuth } from '@/composables/useAuth'

const isClick = ref(false)

const { errors, handleSubmit } = useForm({
  validationSchema: LoginFormSchema,
  initialValues: {
    email: '',
    password: ''
  }
})
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const route = useRoute()
const { authUser, login, logout } = useAuth()
const { userInfo, getUserSchool } = useUserApi()
const { showSnackbar } = useSnackBar()

const isSignupPage = computed(() => route.path === '/signup')

const handleLogin = handleSubmit(async (values, { resetForm }) => {
  isClick.value = true

  try {
    const user = await login(values.email, values.password)
    if (user === null) {
      showSnackbar(ERROR_FIREBASE_INVALID_USER_INFO, false)
      return
    }

    authUser.value = user

    const idToken = await authUser.value.getIdToken()

    try {
      userInfo.value = await getUserSchool(idToken)

      switch (userInfo.value.user.user_type) {
        case 0:
          await navigateTo('/student')
          break
        case 1:
          await navigateTo('/teacher')
          break
        default:
          showSnackbar(ERROR_LOGIN_FAILED, false)
          break
      }

      resetForm()
    }
    catch {
      await logout()
      showSnackbar(ERROR_LOGIN_FAILED, false)
    }
  }
  catch (error) {
    if (error instanceof FirebaseError && error.code === 'auth/invalid-credential') {
      showSnackbar(ERROR_FIREBASE_INVALID_CREDENTIALS, false)
    }
    else {
      await logout()
      showSnackbar(ERROR_FIREBASE_UNEXPECTED, false)
    }
  }
  finally {
    isClick.value = false
  }
})
</script>

<template>
  <form
    class="w-full max-w-[420px] px-2 py-4"
    @submit.prevent="handleLogin"
  >
    <h2 class="border-b border-slate-300 pb-5 text-center text-xl font-bold">
      ログイン
    </h2>

    <div class="space-y-4 py-8">
      <div>
        <BaseFormLabel
          text="メールアドレス"
          input-for="loginEmail"
        />
        <input
          id="loginEmail"
          v-model="email"
          type="text"
          autocomplete="email"
          placeholder="mail@sample.com"
          data-testId="input-email"
          class="block w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-900"
        >
        <BaseErrorValidationMessage
          v-if="errors.email"
          :text="errors.email"
        />
      </div>

      <div>
        <BaseFormLabel
          text="パスワード"
          input-for="loginPassword"
        />
        <input
          id="loginPassword"
          v-model="password"
          type="password"
          autocomplete="current-password"
          data-testId="input-password"
          class="block w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-900"
        >
        <BaseErrorValidationMessage
          v-if="errors.password"
          :text="errors.password"
        />
      </div>

      <div class="flex justify-start">
        <BaseLink
          text="パスワードを忘れた方"
          path="forgotpassword"
          class="text-center text-blue-700 hover:underline"
        />
      </div>

      <BaseButton
        type="submit"
        :text="!isClick ? 'ログイン' : '接続中...'"
        button-type="none"
        :is-clicked="isClick"
        class="w-full bg-[#057767] text-white hover:bg-[#057767]/75"
      />
    </div>

    <div
      v-if="!isSignupPage"
      class="border-t border-slate-300 pt-5"
    >
      <BaseLink
        text="アカウントをお持ちでない方はこちら"
        path="signup"
        class="text-center text-blue-700 hover:underline"
      />
    </div>
  </form>
</template>
