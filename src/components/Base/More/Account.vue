<script setup lang="ts">
interface Props {
  name: string
  email: string
  role: number
}
interface Emits {
  (event: 'selectMenu', item: number): void
}
defineProps<Props>()
const emit = defineEmits<Emits>()

const menuRef = ref<HTMLElement | null>(null)
const ignoreClickRef = ref<HTMLElement | null>(null)

const { isActive, openToggle, closeToggle } = useToggle()
const selectItem = (item: number) => emit('selectMenu', item)
onClickOutside(menuRef, (event) => {
  if (ignoreClickRef.value && ignoreClickRef.value.contains(event.target as Node)) {
    return
  }

  closeToggle()
})
</script>

<template>
  <div class="relative">
    <div
      ref="menuRef"
      data-testId="dropdown"
      class="flex cursor-pointer items-center justify-center rounded-full bg-slate-300 p-1"
      @click="openToggle"
    >
      <Icon
        name="mdi:user"
        size="24px"
        style="color: white"
      />
    </div>

    <div
      v-show="isActive"
      data-testId="menuList"
      class="absolute right-0 top-11 z-20 w-auto whitespace-nowrap rounded border border-slate-300 bg-white shadow-md"
    >
      <ul ref="ignoreClickRef">
        <li class="px-3 pb-1 pt-2 text-[#041e49]">
          <p data-testId="name">
            {{ name }}
          </p>
          <p
            data-testId="email"
            class="mt-0.5 text-xs"
          >
            {{ email }}
          </p>
          <p
            data-testId="role"
            class="mt-0.5 border-b border-slate-300 pb-2 text-xs"
          >
            {{ role === 0 ? '学生' : '教師' }}
          </p>
        </li>
      </ul>
      <ul
        v-for="(item, i) in ACCOUNT_SETTINGS"
        :key="i"
      >
        <li
          :data-testId="`textIndex-${i}`"
          class="flex cursor-pointer items-center px-3 py-2 text-[#041e49] hover:bg-slate-100"
          @click="selectItem(item.value)"
        >
          <Icon
            :name="item.iconName"
            size="20px"
            style="color: rgba(4, 30, 73, 0.7)"
            class="mr-1.5"
          />
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
