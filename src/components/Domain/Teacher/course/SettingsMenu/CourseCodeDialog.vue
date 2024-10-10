<script setup lang="ts">
interface Emits {
  (event: 'dialogClosed'): void
}

const emit = defineEmits<Emits>()
const dialogRef = ref(null)

const { courseCode } = useCourseApi()
const { dialog, openDialog, closeDialog } = useDialog()
onClickOutside(dialogRef, closeDialog)

watch(dialog, () => {
  if (dialog.value === false) {
    emit('dialogClosed')
  }
})

onMounted(() => {
  openDialog()
})
</script>

<template>
  <BaseDialogOverlay
    v-if="dialog"
    data-testId="dialog"
  >
    <div class="flex w-full justify-center px-4">
      <BaseDialog
        ref="dialogRef"
        title="クラスコード"
        wide="small"
      >
        <template #icon>
          <BaseButton
            button-type="circleNormal"
            @click="closeDialog"
          >
            <Icon
              name="ic:baseline-close"
              size="30px"
            />
          </BaseButton>
        </template>

        <div
          data-testId="courseCode"
          class="flex items-center justify-center text-[40px] xs:text-[80px]"
        >
          {{ courseCode }}
        </div>
      </BaseDialog>
    </div>
  </BaseDialogOverlay>
</template>
