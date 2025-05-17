<script setup lang="ts">
const dialogRef = ref(null)

const route = useRoute()
const { userInfo } = useUserApi()
const { dialog, openDialog, closeDialog } = useDialog()
onClickOutside(dialogRef, closeDialog)

watch(() => route.path, () => {
  closeDialog()
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <BaseLayoutAppBar>
      <template #icon>
        <NuxtLink
          class="flex items-center"
          to="/"
        >
          <NuxtImg
            provider="cloudinary"
            src="logo_bc5hbs.png"
            width="32px"
            class="mr-1"
          />
          <span class="font-bold">
            ReCap
          </span>
        </NuxtLink>
      </template>
      <div
        v-if="!userInfo"
        class="flex items-center justify-center"
      >
        <button
          class="text-sm font-medium hover:text-emerald-600"
          @click="openDialog"
        >
          ログイン
        </button>

        <span class="mx-1.5">/</span>

        <BaseLink
          text="新規登録"
          path="signup"
          class="font-medium hover:text-emerald-600"
        />
      </div>
    </BaseLayoutAppBar>
    <main class="flex flex-1 flex-col py-10">
      <slot />

      <BaseDialogOverlay
        v-if="dialog"
        data-testId="dialog"
      >
        <div class="flex w-full justify-center px-4">
          <BaseDialog
            ref="dialogRef"
            wide="small"
          >
            <DomainLoginForm />
          </BaseDialog>
        </div>
      </BaseDialogOverlay>
    </main>
    <BaseLayoutFooter />
  </div>
</template>
