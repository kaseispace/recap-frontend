<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { sendPasswordResetEmail } from 'firebase/auth'

definePageMeta({
  middleware: ['route']
})

useHead(FORGOT_PASSWORD_META)

const isClick = ref(false)
const isEmailSent = ref(true)

const { errors, handleSubmit } = useForm({
  validationSchema: PasswordResetSchema,
  initialValues: {
    email: ''
  }
})
const { value: email } = useField<string>('email')

const { $firebaseAuth } = useNuxtApp()
const { snackbarMessage, snackbarStatus, showSnackbar } = useSnackBar()

const handleResetPassword = handleSubmit(async (values, { resetForm }) => {
  isClick.value = true
  try {
    await sendPasswordResetEmail($firebaseAuth, values.email, {
      url: REDIRECT_URL
    })

    isEmailSent.value = false
    resetForm()
  }
  catch {
    showSnackbar(ERROR_FIREBASE_PASSWORD_RESET_EMAIL_FAILED, false)
  }
  finally {
    isClick.value = false
  }
})
</script>

<template>
  <div class="flex w-full justify-center px-4">
    <BaseSnackbar
      :notification="snackbarMessage"
      :status="snackbarStatus"
    />

    <BaseForm title="パスワード再設定">
      <!-- メールアドレス入力 -->
      <div v-if="isEmailSent">
        <BaseFormLabel
          text="メールアドレス"
          input-for="email"
        />
        <BaseFormTextInput
          v-model="email"
          data-testId="textInput"
          input-id="email"
          input-placeholder="mail@sample.com"
          autocomplete="email"
          :is-bg-color="false"
        />
        <BaseErrorValidationMessage
          v-if="errors.email"
          data-testId="errorEmail"
          :text="errors.email"
        />
      </div>

      <div
        v-if="isEmailSent"
        class="pt-5"
      >
        <BaseButton
          data-testId="clickSend"
          text="送信"
          button-type="none"
          :is-clicked="isClick"
          class="w-full bg-emerald-600 text-white hover:bg-emerald-600/75"
          @click="handleResetPassword"
        />
      </div>

      <div
        v-else
        class="w-full rounded-md bg-slate-100 p-3 text-sm"
      >
        <p data-testId="emailSent">
          再設定用URLを記載したメールを送信しました
        </p>
      </div>
    </BaseForm>
  </div>
</template>
