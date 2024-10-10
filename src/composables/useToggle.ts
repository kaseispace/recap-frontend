export const useToggle = (resetForm?: () => void) => {
  const isActive = ref(false)

  const openToggle = () => {
    isActive.value = !isActive.value
    if (resetForm) {
      resetForm()
    }
  }

  const closeToggle = () => (isActive.value = false)

  return { isActive, openToggle, closeToggle }
}
