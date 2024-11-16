<script setup lang="ts">
import { sendPasswordResetEmail } from 'firebase/auth'

interface Props {
  bgColor: string
}
interface Emits {
  (event: 'dialogClosed'): void
}
defineProps<Props>()
const emit = defineEmits<Emits>()

const dialogRef = ref(null)
const isClick = ref(false)

const { $firebaseAuth } = useNuxtApp()
const { authUser } = useAuth()
const { showSnackbar } = useSnackBar()
const { dialog, openDialog, closeDialog } = useDialog()
onClickOutside(dialogRef, closeDialog)

const config = useRuntimeConfig()

const handleChangePassword = async () => {
  isClick.value = true
  try {
    if (!authUser.value?.email) {
      showSnackbar(ERROR_FIREBASE_AUTHENTICATION_FAILED, false)
      return
    }

    await sendPasswordResetEmail($firebaseAuth, authUser.value.email, {
      url: config.public.backendUrl
    })
    showSnackbar(SUCCESS_FIREBASE_PASSWORD_RESET_EMAIL_SENT, true)
    closeDialog()
  }
  catch {
    showSnackbar(ERROR_FIREBASE_PASSWORD_RESET_EMAIL_FAILED, false)
  }
  finally {
    isClick.value = false
  }
}

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
        title="パスワード再設定"
        wide="small"
      >
        <div>
          <p class="text-sm">
            {{ PASSWORD_RESET_MESSAGE }}
          </p>
        </div>

        <template #footer>
          <BaseButton
            data-testId="clickCancel"
            text="キャンセル"
            button-type="none"
            class="border border-slate-400 hover:bg-slate-100"
            @click="closeDialog"
          />

          <BaseButton
            data-testId="clickSend"
            text="送信する"
            button-type="none"
            :is-clicked="isClick"
            :class="bgColor"
            @click="handleChangePassword"
          />
        </template>
      </BaseDialog>
    </div>
  </BaseDialogOverlay>
</template>
