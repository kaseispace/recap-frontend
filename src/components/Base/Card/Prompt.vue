<script setup lang="ts">
interface Props {
  title: string
  bgColor: string
  contents: PromptContent[]
  isSelected: boolean
}
defineProps<Props>()
</script>

<template>
  <div class="relative flex flex-col rounded-md border shadow-md">
    <div
      data-testId="propsBgColor"
      class="flex justify-between rounded-t-md p-3"
      :class="[bgColor]"
    >
      <div class="mr-0.5 flex">
        <div class="flex items-start">
          <slot name="promptIcon" />
        </div>

        <div
          data-testId="propsTitle"
          class="ml-2 flex w-auto items-center font-semibold text-white"
        >
          {{ title }}
        </div>
      </div>

      <div class="flex items-start justify-center">
        <slot name="moreIcon" />
      </div>
    </div>

    <div
      v-if="isSelected"
      class="absolute -right-2 -top-2 flex items-center justify-center rounded-full border-2 border-white bg-sky-500 p-0.5"
    >
      <slot name="badgeIcon" />
    </div>

    <div class="flex flex-col p-3">
      <div class="flex flex-col">
        <ul
          data-testId="propsContents"
          class="space-y-3"
        >
          <li
            v-for="(content, i) in contents"
            :key="i"
            class="relative flex rounded-lg bg-gray-100 px-3 py-2"
          >
            <span> Q{{ i + 1 }}. </span>
            <span class="ml-1">{{ content.content }}</span>
            <div
              class="absolute left-[-10px] top-2 size-0 origin-center rotate-12 border-[10px] border-transparent border-t-gray-100"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
