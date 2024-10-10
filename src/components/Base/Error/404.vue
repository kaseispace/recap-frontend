<script setup lang="ts">
interface Props {
  imgPath: string
}
defineProps<Props>()

interface Emits {
  (event: 'imageLoad', isImageLoaded: boolean): void
}
const emit = defineEmits<Emits>()

const isImageLoaded = ref(false)

watch(isImageLoaded, () => {
  if (isImageLoaded.value === true) {
    emit('imageLoad', isImageLoaded.value)
  }
})
</script>

<template>
  <div class="mb-6 flex flex-col items-center">
    <div class="bg-white">
      <NuxtImg
        data-testId="propsImg"
        preload
        provider="cloudinary"
        :src="imgPath"
        sizes="150px sm:300px"
        alt="ページが見つかりません"
        @load="isImageLoaded = true"
      />
    </div>

    <p
      v-if="isImageLoaded"
      data-testId="errorMsg"
      class="mt-2 text-sm sm:text-xl"
    >
      お探しのページが見つかりませんでした
    </p>
  </div>
</template>
