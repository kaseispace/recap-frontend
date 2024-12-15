<script setup lang="ts">
interface Props {
  courses: Course[] | StudentCourse[] | null
  title: string
  courseName: string
  listActiveBg: string
  listInactiveBg: string
  pathName: string
  schoolName: string
}
defineProps<Props>()

const dialogRef = ref(null)

const route = useRoute()
const { logout } = useAuth()
const { width } = useWindowSize()
const { dialog, openDialog, closeDialog } = useDialog()
onClickOutside(dialogRef, closeDialog)

const handleLogout = async () => {
  await logout()
  closeDialog()
}

const isMobile = computed(() => width.value < 640)
</script>

<template>
  <button
    v-show="isMobile"
    data-testId="button"
    class="mr-3 flex items-center justify-center rounded-md border-[1.5px] border-slate-200 p-1"
    @click="openDialog"
  >
    <Icon
      name="mdi:menu"
      size="20px"
      style="color: #64748b"
    />
  </button>

  <BaseDialogOverlay
    v-if="dialog"
    class="pr-8"
    data-testId="dialog"
    dialog-type="left"
  >
    <!-- px-5 py-2 -->
    <div
      ref="dialogRef"
      class="slide-in-left flex w-full max-w-[320px] flex-col bg-white px-4 py-3"
    >
      <div class="flex items-center justify-between pb-3">
        <div class="flex items-center">
          <NuxtImg
            provider="cloudinary"
            src="logo_bc5hbs.png"
            width="32px"
          />
          <span class="ml-2 text-base font-black text-slate-400">ReCap</span>
        </div>

        <BaseButton
          class="p-2"
          button-type="circleNormal"
          @click="closeDialog"
        >
          <Icon
            name="ic:baseline-close"
            size="16px"
            style="color: #1f2937"
          />
        </BaseButton>
      </div>

      <div class="flex items-center border-b pb-3">
        <span class="text-sm">
          {{ schoolName }}
        </span>
      </div>

      <!-- ホームアイコン -->
      <div class="mt-2 flex items-center justify-between">
        <NuxtLink
          data-testId="home"
          class="flex w-full items-center space-x-2 rounded-md px-2 py-1.5"
          :class="route.name === pathName ? [listActiveBg] : [listInactiveBg]"
          to="/student"
          @click="closeDialog"
        >
          <Icon
            name="fluent-mdl2:home"
            size="18px"
            style="color: #1f2937"
          />
          <span class="text-sm text-gray-800">ホーム</span>
        </NuxtLink>
      </div>

      <div class="mb-1 mt-3 flex w-full items-center space-x-2 px-2 py-1.5">
        <Icon
          name="streamline:class-lesson"
          size="18px"
          style="color: #1f2937"
        />
        <span
          data-testId="title"
          class="text-sm text-gray-800"
        >{{ title }}</span>
      </div>

      <div
        data-testId="menuList"
        class="menu-scrollbar mb-[18px] grow overflow-y-auto"
      >
        <template v-if="courses && courses.length > 0">
          <ul
            v-for="(course, i) in courses"
            :key="i"
          >
            <NuxtLink
              :data-testId="`link-${i}`"
              class="flex"
              :to="{ name: courseName, params: { id: course.uuid } }"
              @click="closeDialog"
            >
              <!-- アイコンが無い分の余白 -->
              <div class="mr-[16px] border-r-2 px-2" />
              <li
                :data-testId="`propsBgColor-${i}`"
                class="w-full cursor-pointer truncate rounded-md px-2 py-1.5 text-sm"
                :class="route.params.id === course.uuid ? [listActiveBg] : [listInactiveBg]"
              >
                {{ course.name }}
              </li>
            </NuxtLink>
          </ul>
        </template>

        <div
          v-else
          data-testId="noJoinCourse"
        >
          <span class="ml-[26px] w-full px-2 py-1.5 text-sm">なし</span>
        </div>
      </div>

      <!-- ログアウトアイコン -->
      <div class="flex-none border-t pt-3">
        <button
          class="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 hover:bg-slate-100"
          @click="handleLogout"
        >
          <Icon
            name="material-symbols:logout-sharp"
            size="18px"
            style="color: #1f2937"
          />
          <span class="text-sm text-gray-800">ログアウト</span>
        </button>
      </div>
    </div>
  </BaseDialogOverlay>
</template>
