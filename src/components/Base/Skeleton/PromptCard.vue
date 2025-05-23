<template>
  <div class="w-full rounded-md border shadow-md">
    <div class="flex animate-pulse flex-col">
      <div class="h-[52px] rounded-t-md bg-gray-300" />

      <div class="px-5 pb-2 pt-5">
        <div
          v-for="n in 3"
          :key="n"
          class="grid gap-y-2 pb-3"
        >
          <div class="h-3 rounded-full bg-gray-300" />
          <div class="h-3 w-2/3 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  </div>
</template>
