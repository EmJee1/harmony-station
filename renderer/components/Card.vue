<template>
  <component
    :is="component"
    :to="to"
    class="rounded bg-slate-50 p-4 shadow-sm shadow-slate-200 transition-shadow"
    :class="{
      'hover:shadow-md': clickable,
    }"
  >
    <img :src="image" alt="" class="aspect-square w-full bg-red-600" />
    <h5 class="mt-2 truncate font-bold">
      {{ title }}
    </h5>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  image: string
  title: string
  to: string
}>()

const component = computed(() => {
  if (props.to) {
    return RouterLink
  }

  return 'div'
})

const clickable = computed(() => !!props.to)
</script>
