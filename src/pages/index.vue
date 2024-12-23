<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { FirebaseError } from 'firebase/app'
import { useAuth } from '@/composables/useAuth'

definePageMeta({
  middleware: ['route']
})

useHead(LOGIN_META)

const isClick = ref(false)
const isLoading = ref(false)

const { errors, handleSubmit } = useForm({
  validationSchema: LoginFormSchema,
  initialValues: {
    email: '',
    password: ''
  }
})
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const { authUser, login, logout } = useAuth()
const { userInfo, getUserSchool } = useUserApi()
const { teacherCourses } = useCourseApi()
const { studentCourses } = useUserCourseApi()
const { snackbarMessage, snackbarStatus, showSnackbar } = useSnackBar()

const handleLogin = handleSubmit(async (values, { resetForm }) => {
  isClick.value = true
  isLoading.value = true
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
    isLoading.value = false
  }
})

onMounted(() => {
  teacherCourses.value = null
  studentCourses.value = null
})
</script>

<template>
  <div class="flex w-full justify-center px-4">
    <BaseSnackbar
      :notification="snackbarMessage"
      :status="snackbarStatus"
    />

    <BaseForm title="ログイン">
      <div>
        <BaseFormLabel
          text="メールアドレス"
          input-for="email"
        />
        <BaseFormTextInput
          v-model="email"
          data-testId="input-email"
          input-id="email"
          input-placeholder="mail@sample.com"
          autocomplete="email"
          :is-bg-color="false"
        />
        <BaseErrorValidationMessage
          v-if="errors.email"
          :text="errors.email"
        />
      </div>

      <div>
        <BaseFormLabel
          text="パスワード"
          input-for="password"
        />
        <BaseFormTextInput
          v-model="password"
          data-testId="input-password"
          input-id="password"
          input-type="password"
          autocomplete="current-password"
          :is-bg-color="false"
        />
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

      <div>
        <BaseButton
          text="ログイン"
          button-type="none"
          :is-clicked="isClick"
          class="w-full bg-emerald-600 text-white hover:bg-emerald-600/75"
          @click="handleLogin"
        />
      </div>

      <template #footer>
        <div class="border-t border-slate-300 pt-5">
          <BaseLink
            text="アカウントをお持ちでない方はこちら"
            path="signup"
            class="text-center text-blue-700 hover:underline"
          />
        </div>
      </template>
    </BaseForm>

    <BaseDialogOverlay v-show="isLoading">
      <div class="flex flex-col items-center">
        <Icon
          name="eos-icons:three-dots-loading"
          size="100px"
          style="color: white"
        />
        <p class="text-2xl font-bold text-white">
          Now Loading...
        </p>
      </div>
    </BaseDialogOverlay>
  </div>
</template>
