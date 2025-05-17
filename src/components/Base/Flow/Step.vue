<script setup lang="ts">
interface Props {
  timing: string
  userType: string
  stepNumber: string
  imagePath: string
  subtitle: string
  subtitleAlt?: string
}

defineProps<Props>()
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col gap-y-4">
      <div class="flex w-full items-center justify-center bg-[#057767] p-2">
        <p
          class="text-center text-base font-bold text-white"
          data-testId="propsStepStatus"
        >
          {{ timing }}<br>
          ({{ userType }})
        </p>
      </div>

      <div class="flex h-[160px] w-full flex-col items-center justify-center gap-y-1 bg-white p-2">
        <p
          class="text-base font-bold text-[#057767]"
          data-testId="propsStepNumber"
        >
          {{ stepNumber }}
        </p>

        <div class="flex h-full flex-col items-center justify-center gap-y-1">
          <NuxtImg
            format="webp"
            provider="cloudinary"
            :src="imagePath"
            width="75px"
          />

          <h4 class="text-center text-base font-bold">
            {{ subtitle }}<br>
            {{ subtitleAlt }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>
