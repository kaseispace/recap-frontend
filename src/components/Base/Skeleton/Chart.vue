<script setup lang="ts">
const { width } = useWindowSize()

const dynamicCount = computed(() => width.value > 640 ? 12 : 5)
</script>

<template>
  <div class="mb-4 w-full bg-white">
    <div class="flex animate-pulse flex-col p-4">
      <div class="h-5 w-32 rounded-full bg-gray-300" />

      <div class="mt-5 flex">
        <div class="mr-2 flex flex-col space-y-7">
          <template
            v-for="n in 6"
            :key="n"
          >
            <div class="h-4 w-12 rounded-full bg-gray-300" />
          </template>
        </div>

        <div class="w-full bg-gray-300" />
      </div>

      <div class="mt-2 flex">
        <div class="mr-2 h-4 w-12 shrink-0 rounded-full bg-gray-300 opacity-0" />

        <div class="flex w-full justify-between space-x-2">
          <template
            v-for="n in dynamicCount"
            :key="n"
          >
            <div class="h-4 w-full max-w-12 rounded-full bg-gray-300" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
