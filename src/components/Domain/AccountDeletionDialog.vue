<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import type { FetchError } from 'ofetch'

interface Emits {
  (event: 'dialogClosed'): void
}
const emit = defineEmits<Emits>()

const dialogRef = ref(null)
const isClick = ref(false)

const { errors, handleSubmit } = useForm({
  validationSchema: AccountDeletionSchema,
  initialValues: {
    password: ''
  }
})
const { value: password } = useField<string>('password')

const { authUser } = useAuth()
const { userInfo, deleteUser } = useUserApi()
const { showSnackbar } = useSnackBar()
const { dialog, openDialog, closeDialog } = useDialog()
onClickOutside(dialogRef, closeDialog)

const handleDeleteAccount = handleSubmit(async (values, { resetForm }) => {
  isClick.value = true
  try {
    if (!authUser.value) {
      showSnackbar(ERROR_FIREBASE_AUTHENTICATION_FAILED, false)
      return
    }

    if (!authUser.value.email) {
      showSnackbar(ERROR_FIREBASE_EMAIL_NOT_FOUND, false)
      return
    }

    try {
      const credential = EmailAuthProvider.credential(
        authUser.value.email,
        values.password
      )

      await reauthenticateWithCredential(authUser.value, credential)
    }
    catch (error) {
      console.log('削除エラー', error)
      showSnackbar(ERROR_FIREBASE_RE_AUTHENTICATION_FAILED, false)
      return
    }

    const idToken = await authUser.value.getIdToken()

    // Firebase認証情報の削除
    await authUser.value.delete()

    try {
      await deleteUser(authUser.value.uid, idToken)
      resetForm()
      userInfo.value = null
      closeDialog()
      await navigateTo('/')
    }
    catch (error) {
      switch ((error as FetchError).status) {
        case 404:
          showSnackbar(ERROR_USER_NOT_FOUND, false)
          break
        default:
          showSnackbar(ERROR_USER_DELETION_FAILED, false)
          break
      }
    }
  }
  catch {
    showSnackbar(ERROR_FIREBASE_USER_DELETION_FAILED, false)
  }
  finally {
    isClick.value = false
  }
})

watch(dialog, () => {
  if (dialog.value === false) {
    emit('dialogClosed')
  }
})

onMounted(() => {
  openDialog()
})
</script>

<template>
  <BaseDialogOverlay
    v-if="dialog"
    data-testId="dialog"
  >
    <div class="flex w-full justify-center px-4">
      <BaseDialog
        ref="dialogRef"
        title="退会"
        wide="small"
      >
        <p class="text-sm">
          {{ ACCOUNT_DELETION_MESSAGE }}
        </p>

        <div class="w-full rounded-md bg-gray-200 p-3 text-sm">
          <p class="mb-1">
            すべてのデータが完全に削除されます
          </p>
          <p>この操作は元に戻せません</p>
        </div>

        <form>
          <!-- ユーザー名フィールド（隠しフィールドとして追加） -->
          <input
            id="username"
            type="text"
            name="username"
            class="hidden"
            autocomplete="username"
          >

          <BaseFormLabel
            text="再認証のためにパスワードを入力してください"
            input-for="password"
          />
          <BaseFormTextInput
            v-model="password"
            input-id="password"
            input-type="password"
            autocomplete="current-password"
            :is-bg-color="false"
          />
          <BaseErrorValidationMessage
            v-if="errors.password"
            :text="errors.password"
          />
        </form>

        <template #footer>
          <BaseButton
            text="キャンセル"
            button-type="none"
            class="border border-slate-400 hover:bg-slate-100"
            @click="closeDialog"
          />

          <BaseButton
            data-testId="clickDelete"
            text="退会する"
            button-type="none"
            :is-clicked="isClick"
            class="bg-red-600 text-white hover:bg-red-600/75"
            @click="handleDeleteAccount"
          />
        </template>
      </BaseDialog>
    </div>
  </BaseDialogOverlay>
</template>
