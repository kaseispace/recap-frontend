<template>
  <div class="flex flex-col-reverse items-center justify-center border-t py-3.5 sm:flex-row sm:space-x-2">
    <p class="text-sm">
      © 2024 ReCap.
    </p>

    <div class="mb-2 flex items-center justify-center space-x-2 sm:mt-2">
      <template
        v-for="link in POLICY_LINKS"
        :key="link.value"
      >
        <BaseLink
          :text="link.name"
          :path="link.path"
          class="hover:underline"
        />
      </template>

      <template
        v-for="link in SNS_LINKS"
        :key="link.value"
      >
        <NuxtLink
          class="flex items-center"
          :to="link.path"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            class="bg-slate-600 hover:bg-slate-600/75"
            :name="link.iconName"
            :size="link.iconSize"
          />
        </NuxtLink>
      </template>
    </div>
  </div>
</template>
