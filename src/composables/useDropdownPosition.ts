export const useDropdownPosition = (menuRef: Ref<HTMLElement | null>) => {
  const isMenuAbove = ref(false)

  const checkMenuPosition = () => {
    const rect = menuRef.value?.getBoundingClientRect()
    if (rect) {
      const windowHeight = window.innerHeight
      isMenuAbove.value = rect.bottom + 200 > windowHeight
    }
  }

  onMounted(() => {
    window.addEventListener('resize', checkMenuPosition)
    checkMenuPosition()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMenuPosition)
  })

  return { isMenuAbove, checkMenuPosition }
}
