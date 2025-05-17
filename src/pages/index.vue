<script setup lang="ts">
definePageMeta({
  middleware: ['route']
})

useHead(LOGIN_META)

const { teacherCourses } = useCourseApi()
const { studentCourses } = useUserCourseApi()
const { snackbarMessage, snackbarStatus } = useSnackBar()

onMounted(() => {
  teacherCourses.value = null
  studentCourses.value = null
})
</script>

<template>
  <div class="-mt-10 flex flex-col items-center">
    <BaseSnackbar
      :notification="snackbarMessage"
      :status="snackbarStatus"
    />

    <div class="relative h-[500px] w-full xs:h-[600px]">
      <NuxtImg
        format="webp"
        provider="cloudinary"
        src="hero-banner_rkubku.png"
        class="absolute inset-0 size-full object-cover"
      />

      <div class="relative flex h-full items-center justify-center">
        <!-- キャッチフレーズ -->
        <div class="flex h-[500px] flex-col justify-center text-white lg:w-[952px] lg:flex-row xl:w-[1080px] 2xl:w-[1128px]">
          <div class="w-full shrink-0 px-5 pb-2 sm:px-0 lg:w-[466px] lg:pb-0">
            <h1 class="pb-4 text-3xl font-black leading-[40px] xs:text-4xl xs:leading-[48px] sm:text-5xl sm:leading-[68px]">
              振り返りで<br>
              学びをもっと深く
            </h1>

            <p
              class="text-sm font-medium leading-[28px] xs:text-[16px] sm:text-[18px]"
              data-testId="catchphraseDescription"
            >
              対話型振り返りシステム「ReCap」<br>
              教員と学生のための振り返り学習プラットフォーム
            </p>
          </div>

          <div class="flex items-center justify-center px-5 sm:px-0 lg:items-end lg:justify-end">
            <NuxtImg
              format="webp"
              provider="cloudinary"
              src="recap-pc_dwzb62.png"
              class="w-full xs:w-[500px] lg:w-full"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex w-full justify-center bg-[#F2F3F7]">
      <div class="flex w-full flex-col gap-y-8 px-6 py-20 xs:px-12 lg:w-[952px] lg:px-0 xl:w-[1080px] 2xl:w-[1128px]">
        <div class="flex flex-col gap-y-5">
          <h2 class="text-2xl font-bold md2:text-[32px]">
            ReCapとは
            <div class="my-1 w-20 border-t-4 border-[#057767] md2:my-2 md2:w-28" />
          </h2>

          <p class="text-sm font-medium leading-[24px] xs:text-[16px] xs:leading-[28px] sm:text-[18px]">
            ReCap は、教育現場向けの振り返り学習プラットフォームです。<br>
            教員が用意したプロンプトに沿って、学生はチャット形式で振り返りを進めることができます。<br>
            学びの過程を記録し、提出後には個別フィードバックを受け取ることで、理解を深め、新たな気づきを得られます。<br>
            シンプルな設計で誰でも直感的に使えるため、スムーズに振り返りを行うことが可能です。
          </p>
        </div>

        <h3 class="text-center text-xl font-semibold md2:text-[24px] lg:text-[28px]">
          ＜システムの利用イメージ＞
        </h3>

        <div class="flex w-full flex-col items-center gap-y-3 lg:flex-row lg:gap-x-2">
          <template
            v-for="(step, index) in APP_FLOW_STEPS"
            :key="index"
          >
            <BaseFlowStep
              :timing="step.timing"
              :user-type="step.userType"
              :step-number="step.stepNumber"
              :image-path="step.imagePath"
              :subtitle="step.subtitle"
              :subtitle-alt="step.subtitleAlt"
            />

            <BaseFlowTriangle v-if="index < APP_FLOW_STEPS.length - 1" />
          </template>
        </div>
      </div>
    </div>

    <div class="flex w-full justify-center bg-white">
      <div class="flex w-full flex-col gap-y-6 px-6 py-20 xs:px-12 lg:w-[952px] lg:px-0 xl:w-[1080px] 2xl:w-[1128px]">
        <div class="flex flex-col gap-y-12">
          <h2 class="text-2xl font-bold md2:text-[32px]">
            ReCapの主な機能
            <div class="my-1 w-[156px] border-t-4 border-[#057767] md2:my-2 md2:w-52" />
          </h2>

          <template
            v-for="(feature, i) in FEATURE_DETAILS"
            :key="i"
          >
            <BaseCardInfo
              :name="feature.name"
              :description="feature.description"
              :image-path="feature.imagePath"
              :is-image-first="feature.isImageFirst"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
