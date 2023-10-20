<template>
  <button class="relative border-none" @click="launchLightbox">
    <slot />
  </button>
  <div v-if="lightboxOpen" class="fixed inset-0 z-20">
    <div class="h-full w-full bg-black" />
    <Container class="grid-rows-lightbox absolute inset-0 grid text-white">
      <div class="flex items-center justify-end">
        <ButtonIcon aria-label="close lightbox" @click="closeLightbox">
          <XMarkIcon class="" />
        </ButtonIcon>
      </div>
      <div class="grid place-items-center">
        <img :src="src" alt="" class="" />
      </div>
      <div v-if="subtitle" class="grid h-full place-items-center">
        <Typography is="p" variant="body">
          {{ subtitle }}
        </Typography>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import XMarkIcon from '@heroicons/vue/24/outline/XMarkIcon'
import { ref, watch } from 'vue'
import ButtonIcon from './ButtonIcon.vue'
import Container from './Container.vue'
import { useKeydown } from '../composables/keydown'
import Typography from './Typography.vue'

defineProps<{
  src: string
  subtitle?: string
}>()

const escapeDown = useKeydown('Escape')
const lightboxOpen = ref(false)

function launchLightbox() {
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

watch(
  () => escapeDown.value,
  curr => {
    if (!curr && lightboxOpen.value) {
      closeLightbox()
    }
  }
)
</script>
