<template>
  <component
    :is="is"
    :class="{
      'text-3xl': variant === 'heading-1',
      'text-2xl': variant === 'heading-2',
      'text-xl': variant === 'heading-3',
      'text-base': variant === 'body',
      'font-bold': weight === 'bold',
      'font-medium': weight === 'medium',
      'font-normal': weight === 'normal',
      'font-light': weight === 'light',
    }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  is?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label'
  variant?: 'heading-1' | 'heading-2' | 'heading-3' | 'body'
  weight?: 'bold' | 'medium' | 'normal' | 'light'
}

withDefaults(defineProps<Props>(), {
  is: 'p',
  variant: 'body',
  weight: 'normal',
})
</script>
