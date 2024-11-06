<script setup lang="ts">
definePageMeta({
  middleware: ['student-permissions'],
  layout: 'student'
})

useHead(studentCourseListMeta)

const { snackbarMessage, snackbarStatus } = useSnackBar()
</script>

<template>
  <div>
    <BaseSnackbar
      :notification="snackbarMessage"
      :status="snackbarStatus"
    />
    <div class="mx-auto my-16 w-full max-w-7xl space-y-16">
      <div class="mx-6 flex flex-col xs:flex-row xs:items-center xs:justify-between">
        <BaseTitle
          class="mb-2 xs:mb-0"
          text="受講中の授業一覧"
        />

        <DomainStudentIndexJoinCourseCard />
      </div>

      <div class="mx-6">
        <DomainStudentIndexShowCourseCard />
      </div>
    </div>
  </div>
</template>
