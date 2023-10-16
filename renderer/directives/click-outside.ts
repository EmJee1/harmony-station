import { Directive } from 'vue'

interface ClickOutsideHTMLElement extends HTMLElement {
  clickOutsideEvent: (event: MouseEvent) => void
}

export const clickOutside: Directive<ClickOutsideHTMLElement, () => void> = {
  beforeMount: function (e, binding) {
    e.clickOutsideEvent = (event: MouseEvent) => {
      if (!(e == event.target || e.contains(event.target as Node))) {
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
