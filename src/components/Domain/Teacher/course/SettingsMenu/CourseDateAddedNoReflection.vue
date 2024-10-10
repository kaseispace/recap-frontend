<script setup lang="ts">
const isCourseCodeDialogOpen = ref(false)
const isReflectionSwitchDialogOpen = ref(false)
const isEditDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)

const closeCourseCodeDialog = () => (isCourseCodeDialogOpen.value = false)
const closeReflectionSwitchDialog = () => (isReflectionSwitchDialogOpen.value = false)
const closeEditDialog = () => (isEditDialogOpen.value = false)
const closeDeleteDialog = () => (isDeleteDialogOpen.value = false)

const handleMultipleActions = (actionId: number) => {
  switch (actionId) {
    case 1:
      isCourseCodeDialogOpen.value = true
      break
    case 2:
      isReflectionSwitchDialogOpen.value = true
      break
    case 3:
      isEditDialogOpen.value = true
      break
    case 4:
      isDeleteDialogOpen.value = true
      break
  }
}
</script>

<template>
  <div>
    <BaseMore
      data-testId="settingsMenu"
      :menu-array="CourseDateAddedNoReflectionSettings"
      hover-bgcolor="hover:bg-slate-300/50"
      :icon-color="false"
      @select-menu="handleMultipleActions"
    >
      <Icon
        name="mi:options-vertical"
        size="20px"
      />
    </BaseMore>

    <DomainTeacherCourseSettingsMenuCourseCodeDialog
      v-if="isCourseCodeDialogOpen"
      @dialog-closed="closeCourseCodeDialog"
    />
    <DomainTeacherCourseSettingsMenuReflectionSwitchDialog
      v-if="isReflectionSwitchDialogOpen"
      @dialog-closed="closeReflectionSwitchDialog"
    />
    <DomainTeacherCourseSettingsMenuEditDialog
      v-if="isEditDialogOpen"
      @dialog-closed="closeEditDialog"
    />
    <DomainTeacherCourseSettingsMenuDeleteDialog
      v-if="isDeleteDialogOpen"
      @dialog-closed="closeDeleteDialog"
    />
  </div>
</template>
