<script setup lang="ts">
interface Props {
  imgPath: string
  imgAlt: string
  explanation1?: string
  explanation2?: string
}
defineProps<Props>()

const isImageLoaded = ref(false)

const handleImageLoad = () => isImageLoaded.value = true
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="bg-white">
      <NuxtImg
        data-testId="propsImg"
        preload
        provider="cloudinary"
        :src="imgPath"
        sizes="150px sm:300px"
        :alt="imgAlt"
        @load="handleImageLoad"
      />
    </div>

    <div
      v-if="isImageLoaded && (explanation1 || explanation2)"
      data-testId="propsExplanation"
      class="flex flex-col items-center"
    >
      <p
        v-if="explanation1"
        class="mt-2 text-sm sm:text-xl"
      >
        {{ explanation1 }}
      </p>
      <p
        v-if="explanation2"
        class="text-sm sm:text-xl"
      >
        {{ explanation2 }}
      </p>
    </div>
  </div>
</template>
