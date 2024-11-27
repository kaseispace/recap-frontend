<script setup lang="ts">
interface Props {
  bgColor: string
}
defineProps<Props>()

const { logout } = useAuth()
const { width } = useWindowSize()

const isMobile = computed(() => width.value < 640)
const handleLogout = async () => await logout()
</script>

<template>
  <div v-show="!isMobile">
    <!-- sticky,top-0でサイドバーを固定 -->
    <aside class="sticky top-0 z-20 h-screen w-14">
      <!-- アイコンの開始位置を48px下に修正 -->
      <div class="flex h-full flex-col justify-between border-r bg-gray-100 p-2">
        <ul class="flex flex-col">
          <div class="mb-1.5 flex size-10 items-center justify-center">
            <!-- <NuxtImg /> -->
          </div>

          <slot />
        </ul>

        <ul class="flex flex-col">
          <button
            data-testId="propsBgColor"
            class="group flex size-10 items-center justify-center rounded-md p-1"
            :class="[bgColor]"
            @click="handleLogout"
          >
            <BaseTooltip
              class="left-[60px]"
              message="ログアウト"
            />
            <Icon
              data-testId="icon"
              name="material-symbols:logout-sharp"
              size="24px"
            />
          </button>
        </ul>
      </div>
    </aside>
  </div>
</template>
