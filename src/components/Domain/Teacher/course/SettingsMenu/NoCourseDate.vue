<script setup lang="ts">
const isCourseCodeDialogOpen = ref(false)
const isAddDialogOpen = ref(false)

const closeCourseCodeDialog = () => (isCourseCodeDialogOpen.value = false)
const closeAddDialog = () => (isAddDialogOpen.value = false)

const handleMultipleActions = (actionId: number) => {
  switch (actionId) {
    case 1:
      isCourseCodeDialogOpen.value = true
      break
    case 2:
      isAddDialogOpen.value = true
      break
  }
}
</script>

<template>
  <div>
    <BaseMore
      data-testId="settingsMenu"
      :menu-array="NO_COURSE_DATE_SETTINGS"
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

    <DomainTeacherCourseSettingsMenuAddDialog
      v-if="isAddDialogOpen"
      @dialog-closed="closeAddDialog"
    />
  </div>
</template>
