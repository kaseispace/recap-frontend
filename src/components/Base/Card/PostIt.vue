<script setup lang="ts">
const { cardBgColor, sealBgColor, createRandomColor } = useGenerateRandomColor()

onMounted(() => {
  createRandomColor()
})
</script>

<template>
  <div>
    <div
      data-testId="rotationAngle"
      class="cursor-pointer duration-300 ease-in-out hover:scale-110"
    >
      <div
        data-testId="cardBgColor"
        class="relative flex h-60 min-w-60 max-w-96 items-center justify-center text-gray-800"
        :class="cardBgColor"
      >
        <div class="mx-6 my-12 line-clamp-[8] w-full">
          <slot />
        </div>

        <div class="absolute bottom-[-5px] right-[7px] -z-10 h-1/2 w-[70%] rotate-[5deg] bg-[#d0d0d0] blur-sm" />
        <div
          data-testId="sealBgColor"
          class="absolute -top-3 left-1/2 h-8 w-20 -translate-x-1/2 rotate-3"
          :class="sealBgColor"
        />
      </div>
    </div>
  </div>
</template>
