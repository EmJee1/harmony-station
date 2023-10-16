<template>
  <component
    :is="is"
    class="h-6 w-6 rounded-full"
    :class="{ 'cursor-not-allowed opacity-40': disabled }"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    is?: 'button' | 'RouterLink'
    disabled?: boolean
  }>(),
  { is: 'button' }
)

const emit = defineEmits<{
  (e: 'click'): unknown
}>()

function onClick() {
  if (props.disabled) {
    return
  }

  emit('click')
}
</script>
