<script setup lang="ts">
const { userInfo } = useUserApi()
</script>

<!-- 真ん中に配置したい場合はh-screenを追加 -->
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
        <BaseLink
          text="ログイン"
          path="index"
          class="font-medium hover:text-emerald-600"
        />
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
    </main>
    <BaseLayoutFooter />
  </div>
</template>
