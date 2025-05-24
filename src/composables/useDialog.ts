export const useDialog = (resetForm?: () => void) => {
  const dialog = ref(false)

  const disableScroll = (): void => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.overflowY = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }

  const enableScroll = (): void => {
    document.documentElement.style.overflowY = 'scroll'
    document.body.style.paddingRight = '0'
  }

  const openDialog = () => {
    dialog.value = true
    disableScroll()
  }

  const closeDialog = () => {
    dialog.value = false
    enableScroll()
    if (resetForm) {
      resetForm()
    }
  }

  return { dialog, disableScroll, enableScroll, openDialog, closeDialog }
}
