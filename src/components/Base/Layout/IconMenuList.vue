<script setup lang="ts">
interface Props {
  courses: Course[] | StudentCourse[] | null
  title: string
  courseName: string
  activeBg: string
  listActiveBg: string
  inactiveBg: string
  listInactiveBg: string
}
const props = defineProps<Props>()

const listRef = ref<HTMLElement | null>(null)
const ignoreClickRef = ref<HTMLElement | null>(null)

const route = useRoute()
const { isActive: isList, openToggle, closeToggle } = useToggle()
onClickOutside(listRef, (event) => {
  if (ignoreClickRef.value && ignoreClickRef.value.contains(event.target as Node)) {
    return
  }

  closeToggle()
})

const isActive = computed(() => route.name === props.courseName)
</script>

<template>
  <div class="relative z-10">
    <div
      ref="listRef"
      data-testId="toggle"
      class="group relative flex size-10 items-center justify-center rounded-md p-1"
      :class="isActive ? [activeBg] : [inactiveBg]"
      @click="openToggle"
    >
      <slot />
    </div>

    <div
      v-if="isList"
      data-testId="menuList"
      class="absolute left-[52px] top-0 z-20 max-w-[300px] overflow-hidden whitespace-nowrap rounded border border-slate-300 bg-white shadow-md"
    >
      <ul ref="ignoreClickRef">
        <li class="px-1 pb-1 sm:text-sm">
          <p
            data-testId="title"
            class="border-b px-1 py-2 text-black"
          >
            {{ title }}
          </p>
        </li>
      </ul>
      <div class="menu-scrollbar max-h-[400px] overflow-y-auto">
        <template v-if="courses && courses.length > 0">
          <ul
            v-for="(course, i) in courses"
            :key="i"
          >
            <NuxtLink
              :data-testId="`link-${i}`"
              :to="{ name: courseName, params: { id: course.uuid } }"
            >
              <li
                :data-testId="`propsBgColor-${i}`"
                class="cursor-pointer truncate p-2.5 sm:text-sm"
                :class="route.params.id === course.uuid ? [listActiveBg] : [listInactiveBg]"
              >
                {{ course.name }}
              </li>
            </NuxtLink>
          </ul>
        </template>

        <template v-else>
          <ul>
            <li class="p-2.5 sm:text-sm">
              なし
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>
