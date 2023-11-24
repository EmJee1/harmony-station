<template>
  <dialog ref="dialogRef" class="w-full max-w-4xl rounded">
    <div class="space-y-6 p-6">
      <div class="flex items-center justify-between">
        <Typography is="h4" variant="heading-3" weight="bold">
          {{ titleText }}
        </Typography>
        <ButtonIcon is="button" :disabled="!dialogRef" @click="closeDialog">
          <XMarkIcon />
        </ButtonIcon>
      </div>
      <hr />
      <div v-if="healthCheck && !healthCheck.healthy" class="space-y-2">
        <Alert
          v-for="error in healthCheck.errors"
          :key="error.id"
          :severity="error.severity"
        >
          <template v-if="error.code === 'dir-not-visible'">
            We could not read the
            <Typography is="span" variant="body" weight="light">
              {{ error.meta.path }}
            </Typography>
            directory.
          </template>
        </Alert>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import XMarkIcon from '@heroicons/vue/24/outline/XMarkIcon'
import { computed, onMounted, ref } from 'vue'
import Alert from './Alert.vue'
import ButtonIcon from './ButtonIcon.vue'
import Typography from './Typography.vue'
import type { CheckHealthResult } from '../../types/health'

const props = defineProps<{
  /**
   * Describes when the result dialog is shown.
   * "immediately" shows the dialog immediately, at first in a loading state until the results are loaded.
   * "on-error" only shows the dialog if errors are found.
   */
  trigger: 'immediately' | 'on-error'
}>()

const dialogRef = ref<HTMLDialogElement>()
const healthCheck = ref<CheckHealthResult>()
const loading = ref(true)

onMounted(async () => {
  if (props.trigger === 'immediately') {
    dialogRef.value?.showModal()
  }

  healthCheck.value = await window.electronAPI.checkHealth()
  loading.value = false

  if (
    props.trigger === 'on-error' &&
    healthCheck.value &&
    !healthCheck.value.healthy
  ) {
    dialogRef.value?.showModal()
  }
})

const titleText = computed(() => {
  if (loading.value) {
    return 'Loading health check'
  }

  if (!healthCheck.value) {
    return 'Something went wrong'
  }

  if (healthCheck.value.healthy) {
    return 'No health problems found'
  }

  if (healthCheck.value.errors.length === 1) {
    return 'This point may require your attention'
  }

  return 'These points may require your attention'
})

function closeDialog() {
  dialogRef.value?.close()
}
</script>
