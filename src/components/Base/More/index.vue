<script setup lang="ts">
interface Props {
  menuArray: ValueText[]
  hoverBgcolor: string
}
interface Emits {
  (event: 'selectMenu', item: number): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const menuRef = ref(null)
const isActive = ref(false)

const openDropdown = () => (isActive.value = !isActive.value)
const closeDropdown = () => (isActive.value = false)
const selectItem = (item: number) => emit('selectMenu', item)
onClickOutside(menuRef, closeDropdown)
</script>

<!-- 教師用ページで利用中 -->
<template>
  <!-- メインコンテンツ -->
  <div class="relative">
    <div
      ref="menuRef"
      data-testId="propsHoverBgcolor"
      class="flex items-center justify-center rounded-full p-1 transition duration-200"
      :class="[hoverBgcolor]"
      @click="openDropdown"
    >
      <slot />
    </div>

    <ul
      v-if="isActive"
      data-testId="invisible"
      class="absolute right-0 top-8 z-20 w-auto whitespace-nowrap rounded border border-slate-100 bg-white text-start shadow-md"
    >
      <li
        v-for="(item, i) in menuArray"
        :key="i"
        :data-testId="`textIndex-${i}`"
        class="cursor-pointer p-2.5 text-sm hover:bg-slate-100"
        @click="selectItem(item.value)"
      >
        <p>{{ item.text }}</p>
      </li>
    </ul>
  </div>
</template>
