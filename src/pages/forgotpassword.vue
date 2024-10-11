<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { sendPasswordResetEmail } from 'firebase/auth'

definePageMeta({
  middleware: ['route']
})

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
          input-id="email"
          input-placeholder="mail@sample.com"
          autocomplete="email"
        />
        <BaseErrorValidationMessage
          v-if="errors.email"
          :text="errors.email"
        />
      </div>

      <div
        v-if="isEmailSent"
        class="pt-5"
      >
        <BaseButton
          text="送信"
          button-type="none"
          :is-clicked="isClick"
          class="w-full bg-sky-500 text-white hover:bg-sky-500/75"
          @click="handleResetPassword"
        />
      </div>

      <div
        v-else
        class="w-full rounded-md bg-slate-100 p-3 text-sm"
      >
        <p>再設定用のURLを記載した</p>
        <p>メールを送信しました</p>
      </div>
    </BaseForm>
  </div>
</template>
