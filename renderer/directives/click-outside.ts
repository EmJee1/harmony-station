import { Directive } from 'vue'

export const clickOutside: Directive = {
  beforeMount(e, binding) {
    e.clickOutsideEvent = (event: MouseEvent) => {
      if (!(e == event.target || e.contains(event.target))) {
        binding.value()
      }
    }

    document.addEventListener('click', e.clickOutsideEvent, { capture: true })
  },
  unmounted(e) {
    document.removeEventListener('click', e.clickOutsideEvent, {
      capture: true,
    })
  },
}
