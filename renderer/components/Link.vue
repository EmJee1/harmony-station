<template>
  <RouterLink :to="to" class="hover:underline">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>
