<script setup lang="ts">
interface Props {
  comment: string | undefined
}
defineProps<Props>()
</script>

<template>
  <div class="mb-4 flex flex-col space-y-3 rounded-md bg-amber-100 p-4">
    <div class="flex items-center justify-start space-x-2">
      <Icon
        name="ooui:feedback-ltr"
        size="24px"
        style="color: #f59e0b"
      />
      <p class="font-semibold text-amber-500">
        振り返りに対するフィードバック
      </p>
    </div>
    <p v-if="comment">
      {{ comment }}
    </p>
    <p v-else>
      フィードバックはまだありません
    </p>
  </div>
</template>
