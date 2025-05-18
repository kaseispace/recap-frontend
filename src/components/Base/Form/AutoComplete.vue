<script setup lang="ts">
interface Props {
  modelValue: string
  inputId: string
  inputPlaceholder?: string
  suggestionArray: University[] | null
}
interface Emits {
  (event: 'selectSuggestion', selectedSuggestion: University): void
  (event: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  inputPlaceholder: '',
  id: ''
})
const emit = defineEmits<Emits>()
const localArray = ref<string[]>([])
const suggestRef = ref(null)
const isSuggestionVisible = ref(false)
const selectedSuggestionIndex = ref(-1)
let manuallyClosed = false

const { isMenuAbove, checkMenuPosition } = useDropdownPosition(suggestRef)

const openSuggestion = () => (isSuggestionVisible.value = true)
const closeSuggestion = () => {
  isSuggestionVisible.value = false
  selectedSuggestionIndex.value = -1
}

onClickOutside(suggestRef, closeSuggestion)

// 上キーでリスト内を移動
const handleUpKey = () => {
  if (filteredSuggestions.value !== undefined) {
    selectedSuggestionIndex.value
      = (selectedSuggestionIndex.value - 1 + filteredSuggestions.value.length) % filteredSuggestions.value.length
  }
}

// 下キーでリスト内を移動
const handleDownKey = () => {
  if (filteredSuggestions.value !== undefined) {
    selectedSuggestionIndex.value = (selectedSuggestionIndex.value + 1) % filteredSuggestions.value.length
  }
}

// Enterキーでサジェストを選択した場合
const handleEnterKey = () => {
  if (filteredSuggestions.value !== undefined) {
    const text = filteredSuggestions.value[selectedSuggestionIndex.value]
    const selectedSuggestion = props.suggestionArray?.find(suggestionArray => suggestionArray.name === text)
    if (selectedSuggestion !== undefined) {
      emit('selectSuggestion', selectedSuggestion)
      manuallyClosed = true
      closeSuggestion()
    }
  }
}

// サジェストから選択した値を親コンポーネントに送り、サジェストを閉じる
const selectSuggestion = (selectedItem: string) => {
  const selectedSuggestion = props.suggestionArray?.find(suggestionArray => suggestionArray.name === selectedItem)
  if (selectedSuggestion !== undefined) {
    emit('selectSuggestion', selectedSuggestion)
    manuallyClosed = true
    closeSuggestion()
  }
}

// 入力された文字列を検索
const filteredSuggestions = computed(() => {
  let matches = 0
  return localArray.value.filter((item) => {
    if (item.includes(props.modelValue) && matches < 10) {
      matches++
      return true
    }
    return false
  })
})

watchEffect((): void => {
  localArray.value = (props.suggestionArray || []).map(item => item.name)
})

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue.length > 0 && !manuallyClosed) {
      openSuggestion()
    }
    else if (!manuallyClosed) {
      closeSuggestion()
    }
    manuallyClosed = false
  }
)

watch(filteredSuggestions, () => {
  selectedSuggestionIndex.value = -1
})

watch(isSuggestionVisible, async (newVal) => {
  if (newVal) {
    await nextTick()
    checkMenuPosition()
  }
})
</script>

<template>
  <div class="relative">
    <input
      :id="inputId"
      ref="suggestRef"
      :value="modelValue"
      type="text"
      autocomplete="off"
      :placeholder="inputPlaceholder"
      class="block w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-900"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keydown.up.exact="handleUpKey"
      @keydown.down.exact="handleDownKey"
      @keydown.enter.exact="handleEnterKey"
    >
    <div>
      <ul
        v-show="isSuggestionVisible"
        class="absolute z-10 w-full overflow-hidden rounded border border-slate-300 bg-white"
        :class="isMenuAbove ? 'bottom-[50px]' : 'top-[50px]'"
      >
        <li
          v-for="(item, index) in filteredSuggestions"
          :key="index"
          :data-testId="`suggest-${index}`"
          :class="[index === selectedSuggestionIndex ? ' border-emerald-600 bg-slate-100' : 'border-white']"
          class="cursor-default border-l-4 p-1.5 text-sm hover:border-slate-100 hover:bg-slate-100"
          @click="selectSuggestion(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
