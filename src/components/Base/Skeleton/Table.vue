<script setup lang="ts">
const { width } = useWindowSize()

const dynamicCount = computed(() => width.value > 640 ? 7 : 4)
</script>

<template>
  <div class="mb-4 w-full bg-white">
    <div class="flex animate-pulse flex-col p-4">
      <div class="flex flex-col items-end space-y-2 sm:flex-row sm:items-center sm:justify-end sm:space-x-4 sm:space-y-0">
        <template
          v-for="n in 4"
          :key="n"
        >
          <div class="h-[14px] w-full max-w-20 rounded-full bg-gray-300 sm:h-5" />
        </template>
      </div>

      <div>
        <template
          v-for="n in 11"
          :key="n"
        >
          <div class="flex items-center justify-between space-x-3 border-b-2 py-4">
            <div class="h-[14px] min-w-20 rounded-full bg-gray-300 sm:h-5 sm:min-w-28" />

            <template
              v-for="m in dynamicCount"
              :key="m"
            >
              <div class="h-[14px] w-full max-w-16 rounded-full bg-gray-300 sm:h-5 sm:max-w-20" />
            </template>
          </div>
        </template>
      </div>

      <div class="mt-4 flex flex-col items-end space-y-2 sm:flex-row sm:items-center sm:justify-end sm:space-x-4 sm:space-y-0">
        <div class="h-[14px] w-28 rounded-full bg-gray-300 sm:h-5" />

        <div class="flex items-center space-x-4">
          <div class="size-6 rounded-full bg-gray-300 sm:size-7" />
          <div class="h-[14px] w-14 rounded-full bg-gray-300 sm:h-5" />
          <div class="size-6 rounded-full bg-gray-300 sm:size-7" />
        </div>
      </div>
    </div>
  </div>
</template>
