<script setup lang="ts">
const imageLoaded = ref(false)
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="bg-white">
      <NuxtImg
        preload
        provider="cloudinary"
        src="t-empty-reflection_azzydl.png"
        sizes="150px xs2:200px"
        alt="プロンプトがまだ存在しません"
        @load="imageLoaded = true"
      />
    </div>

    <p
      v-if="imageLoaded"
      class="mt-2 text-base"
    >
      まだ振り返りはありません
    </p>
    <p
      v-if="imageLoaded"
      class="mt-2 text-sm text-gray-500"
    >
      登録済みの振り返りがここに表示されます
    </p>
  </div>
</template>
