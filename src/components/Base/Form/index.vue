<script setup lang="ts">
interface Props {
  title: string
}
defineProps<Props>()
</script>

<template>
  <!-- 大枠 -->
  <form class="w-full max-w-[420px] rounded-lg border bg-slate-100 p-4 xs:p-8">
    <!-- ヘッダー -->
    <h2 class="border-b border-slate-300 pb-5 text-center text-lg font-bold">
      {{ title }}
    </h2>

    <!-- メイン -->
    <div class="space-y-4 py-8">
      <slot />
    </div>

    <!-- フッター -->
    <slot name="footer" />
  </form>
</template>
