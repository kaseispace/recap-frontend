<script setup lang="ts">
interface Props {
  subjectName: string
  teacherName?: string
  pathName: string
  paramId: string
  bgColor: string
}
defineProps<Props>()
</script>

<template>
  <div class="relative z-10 flex flex-col overflow-hidden rounded-md border shadow-md">
    <NuxtLink :to="{ name: pathName, params: { id: paramId } }">
      <div
        data-testId="propsBgColor"
        class="flex h-32 justify-between p-3"
        :class="[bgColor]"
      >
        <div class="flex flex-col justify-end">
          <p
            data-testId="propsSubjectName"
            class="line-clamp-3 text-base font-normal text-white md:text-lg"
          >
            {{ subjectName }}
          </p>
          <div
            v-if="teacherName"
            data-testId="propsTeacherName"
            class="flex items-end justify-start"
          >
            <Icon
              name="mdi:user"
              size="15px"
              style="color: white"
            />
            <p class="ml-0.5 text-[10px] text-white">
              {{ teacherName }}
            </p>
          </div>
        </div>

        <div class="flex items-start justify-center">
          <slot name="moreIcon" />
        </div>
      </div>
    </NuxtLink>

    <div class="flex flex-col bg-white p-3">
      <div class="flex justify-end">
        <!-- chipコンポーネントを追加したい場合のスロット -->
        <slot name="chip" />
      </div>
    </div>
  </div>
</template>
