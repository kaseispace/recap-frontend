<!-- 真ん中に配置したい場合はh-screenを追加 -->
<template>
  <div class="flex flex-col">
    <BaseLayoutAppBar
      school-name="ReCap"
      title-font="font-bold"
    >
      <template #icon>
        <NuxtImg
          src="/logo.png"
          width="32px"
          class="mr-1"
        />
      </template>
      <div class="flex items-center justify-center">
        <BaseLink
          text="ログイン"
          path="index"
          class="font-medium hover:text-sky-600"
        />
        <span class="mx-1.5">/</span>
        <BaseLink
          text="新規登録"
          path="signup"
          class="font-medium hover:text-sky-600"
        />
      </div>
    </BaseLayoutAppBar>
    <main class="flex flex-1 items-center justify-center overflow-y-auto py-10">
      <slot />
    </main>
  </div>
</template>
