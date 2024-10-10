export const useSnackBar = () => {
  const snackbarMessage = useState<ValueText | null>('snackbarMessage', () => null)
  const snackbarStatus = useState<boolean | null>('snackbarStatus', () => null)
  let snackbarKey = 0
  const showSnackbar = (message: string, status: boolean): void => {
    snackbarStatus.value = status
    snackbarKey++
    snackbarMessage.value = { value: snackbarKey, text: message }
  }

  return { snackbarMessage, snackbarStatus, showSnackbar }
}
