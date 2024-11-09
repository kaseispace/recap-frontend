<script setup lang="ts">
const isCourseCodeDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)

const closeCourseCodeDialog = () => (isCourseCodeDialogOpen.value = false)
const closeDeleteDialog = () => (isDeleteDialogOpen.value = false)

const handleMultipleActions = (actionId: number) => {
  switch (actionId) {
    case 1:
      isCourseCodeDialogOpen.value = true
      break
    case 2:
      isDeleteDialogOpen.value = true
      break
  }
}
</script>

<template>
  <div>
    <BaseMore
      data-testId="settingsMenu"
      :menu-array="COURSE_DATE_AND_REFLECTION_ADDED_SETTINGS"
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
    <DomainTeacherCourseSettingsMenuDeleteDialog
      v-if="isDeleteDialogOpen"
      @dialog-closed="closeDeleteDialog"
    />
  </div>
</template>
