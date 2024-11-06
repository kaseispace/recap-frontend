<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { FirebaseError } from 'firebase/app'

definePageMeta({
  middleware: ['route']
})

useHead(signupMeta)

// Menuコンポーネントから取得されるtextと組になるvalueを保存する用
const roleValue = ref(0)
const inputSchoolId = ref(0)
const isClick = ref(false)
const isLoading = ref(false)
// Vee-Validate4のセットアップ
const { errors, handleSubmit } = useForm({
  validationSchema: SignUpFormSchema,
  initialValues: {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    roleText: '',
    schoolName: ''
  }
})
const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: passwordConfirm } = useField<string>('passwordConfirm')
const { value: roleText } = useField<string>('roleText')
const { value: schoolName } = useField<string>('schoolName')

const { authUser, signup } = useAuth()
const { userInfo, createUser, deleteUser, registerSchool } = useUserApi()
const { snackbarMessage, snackbarStatus, showSnackbar } = useSnackBar()
const { schoolInfo, getSchool } = useSchoolApi()

// Menuコンポーネントからオブジェクトが返される
const onSelectMenu = (role: ValueText): void => {
  roleText.value = role.text
  roleValue.value = role.value
}
// AutoCompleteコンポーネントからオブジェクトが返される
const onSelectSuggestion = (selectedUniversity: University): void => {
  console.log('サジェスト', selectedUniversity)
  schoolName.value = selectedUniversity.name
  inputSchoolId.value = selectedUniversity.id
}

const checkSchoolId = (schoolName: string) => {
  const checkName = schoolInfo.value?.find(item => item.name === schoolName)
  inputSchoolId.value = checkName ? checkName.id : 0
}

const handleRegistration = handleSubmit(async (values, { resetForm }) => {
  isClick.value = true
  isLoading.value = true
  try {
    // 入力された学校が存在するか事前にチェック、学校が存在しない場合はエラーを出力
    checkSchoolId(values.schoolName)
    if (inputSchoolId.value === 0) {
      return showSnackbar(ERROR_SCHOOL_NOT_FOUND, false)
    }

    // firebaseへの登録
    const user = await signup(values.email, values.password)
    if (user === null) {
      showSnackbar(ERROR_USER_REGISTRATION_FAILED, false)
      return
    }

    authUser.value = user
    const idToken = await authUser.value.getIdToken()
    const uid = authUser.value.uid

    // バックエンドへのユーザー情報の登録
    try {
      await createUser(values.name, roleValue.value, idToken)
    }
    catch {
      await user.delete()
      showSnackbar(ERROR_USER_REGISTRATION_FAILED, false)
      return
    }

    // 所属の登録
    try {
      userInfo.value = await registerSchool(inputSchoolId.value, idToken)

      switch (userInfo.value.user.user_type) {
        case 0:
          await navigateTo('/student')
          break
        case 1:
          await navigateTo('/teacher')
          break
        default:
          showSnackbar(ERROR_USER_MY_PAGE_NAVIGATION_FAILED, false)
          break
      }

      resetForm()
    }
    catch {
      await user.delete()
      await deleteUser(uid, idToken)
      userInfo.value = null
      showSnackbar(ERROR_SCHOOL_NOT_FOUND, false)
    }
  }
  catch (error) {
    if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
      showSnackbar(ERROR_FIREBASE_EMAIL_ALREADY_IN_USE(values.email), false)
    }
    else {
      console.log(error)
      showSnackbar(ERROR_FIREBASE_UNEXPECTED, false)
    }
  }
  finally {
    isClick.value = false
    isLoading.value = false
  }
})

onMounted(async () => {
  try {
    schoolInfo.value = await getSchool()
  }
  catch {
    showSnackbar(UNEXPECTED_ERROR_MESSAGE, false)
  }
})
</script>

<template>
  <div class="flex w-full justify-center px-4">
    <BaseSnackbar
      :notification="snackbarMessage"
      :status="snackbarStatus"
    />

    <BaseForm title="新規登録">
      <!-- 名前入力 -->
      <div>
        <BaseFormLabel
          text="名前"
          input-for="name"
        />
        <BaseFormTextInput
          v-model="name"
          input-id="name"
          input-placeholder="佐藤太郎"
          autocomplete="username"
          data-testId="nameInput"
        />
        <BaseErrorValidationMessage
          v-if="errors.name"
          :text="errors.name"
          data-testId="nameError"
        />
      </div>

      <!-- メールアドレス入力 -->
      <div>
        <BaseFormLabel
          text="メールアドレス"
          input-for="email"
        />
        <BaseFormTextInput
          v-model="email"
          input-id="email"
          input-placeholder="mail@sample.com"
          autocomplete="email"
          data-testId="emailInput"
        />
        <BaseErrorValidationMessage
          v-if="errors.email"
          :text="errors.email"
          data-testId="emailError"
        />
      </div>

      <!-- パスワード入力 -->
      <div>
        <BaseFormLabel
          text="パスワード"
          input-for="password"
        />
        <BaseFormTextInput
          v-model="password"
          input-id="password"
          input-type="password"
          autocomplete="new-password"
        />
        <BaseErrorValidationMessage
          v-if="errors.password"
          :text="errors.password"
        />
      </div>

      <!-- 確認用パスワード入力 -->
      <div>
        <BaseFormLabel
          text="パスワード（確認用）"
          input-for="passwordConfirm"
        />
        <BaseFormTextInput
          v-model="passwordConfirm"
          input-id="passwordConfirm"
          input-type="password"
          autocomplete="new-password"
        />
        <BaseErrorValidationMessage
          v-if="errors.passwordConfirm"
          :text="errors.passwordConfirm"
        />
      </div>

      <!-- アカウントタイプ選択 -->
      <div>
        <BaseFormLabel text="ユーザータイプ" />
        <BaseMenu
          :selected-text="roleText"
          :menu-array="userTypes"
          class="max-w-[180px]"
          @select-menu="onSelectMenu"
        />
        <BaseErrorValidationMessage
          v-if="errors.roleText"
          :text="errors.roleText"
        />
      </div>

      <!-- 所属入力 -->
      <div>
        <BaseFormLabel
          text="所属学校"
          input-for="schoolName"
        />
        <BaseFormAutoComplete
          v-model="schoolName"
          input-id="schoolName"
          input-placeholder="大学名"
          :suggestion-array="schoolInfo"
          @select-suggestion="onSelectSuggestion"
        />
        <BaseErrorValidationMessage
          v-if="errors.schoolName"
          :text="errors.schoolName"
        />
      </div>

      <div class="pt-5">
        <BaseButton
          text="登録"
          button-type="none"
          :is-clicked="isClick"
          class="w-full bg-sky-500 text-white hover:bg-sky-500/75"
          @click="handleRegistration"
        />
      </div>

      <template #footer>
        <div class="border-t pt-5">
          <BaseLink
            text="アカウントをお持ちの方はこちら"
            path="index"
            class="text-center text-sky-600 underline"
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
