<script setup lang="ts">
interface Props {
  selectedText: string
  menuArray: ValueText[]
}
interface Emits {
  (event: 'selectMenu', selectedItem: ValueText): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localArray = ref(props.menuArray)
const menuRef = ref(null)
const newArray = localArray.value.map(item => item.text)

const { isActive: isDropdown, openToggle: openDropdown, closeToggle: closeDropdown } = useToggle()
onClickOutside(menuRef, closeDropdown)

const handleMenuSelection = (item: string) => {
  const selectedItem = localArray.value.find(menuItem => menuItem.text === item)
  if (selectedItem) {
    emit('selectMenu', selectedItem)
  }
}
</script>

<template>
  <!-- メインコンテンツ -->
  <div class="relative">
    <div
      ref="menuRef"
      data-testId="clickIcon"
      class="flex cursor-pointer justify-between rounded border border-gray-300 bg-gray-50 p-2.5 sm:text-sm"
      @click="openDropdown"
    >
      <span class="text-sm">{{ selectedText || '選択してください' }}</span>
      <Icon
        v-if="!isDropdown"
        name="mdi:chevron-down"
        size="24px"
      />
      <Icon
        v-else
        name="mdi:chevron-up"
        size="24px"
      />
    </div>
    <ul
      v-show="isDropdown"
      data-testId="invisible"
      class="menu-scrollbar absolute top-[50px] z-10 max-h-40 w-full overflow-hidden overflow-y-auto rounded border border-slate-300 bg-white shadow-md"
    >
      <li
        v-for="(item, index) in newArray"
        :key="index"
        :data-testId="`dateIndex-${index}`"
        class="cursor-pointer p-2.5 text-sm hover:bg-slate-100"
        @click="handleMenuSelection(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
