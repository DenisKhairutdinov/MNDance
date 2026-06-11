import { pubSub } from './pubsub';
import type { EventName } from './pubsub';

interface GlobalHandlers {
  toggleModal(subEvent: EventName, modal: HTMLDialogElement): void;
  resetButtonState(subEvent: EventName, button: HTMLButtonElement): void;
  setButtonState(element: HTMLButtonElement): void;
  toggleClassName(element: HTMLElement, className: string): void;
  switchAttribute(
    element: HTMLElement,
    attribute: string,
    defaultValue: string,
    value: string,
  ): void;
  toggleAttribute(element: HTMLElement, attribute: string): void;
}

export const globalHandlers: GlobalHandlers = {
  toggleModal(subEvent, modal) {
    pubSub.subscribe(subEvent, () => {
      if (modal.open) {
        modal.close();
      } else {
        modal.showModal();
      }
    });
  },

  resetButtonState(subEvent, button) {
    pubSub.subscribe(subEvent, () => {
      button.setAttribute('aria-expanded', 'false');
    });
  },

  setButtonState(button) {
    button.setAttribute('aria-expanded', 'true');
  },

  toggleClassName(element, className) {
    element.classList.toggle(className);
  },

  switchAttribute(element, attribute, defaultValue, value) {
    if (element.getAttribute(attribute) === defaultValue) {
      element.setAttribute(attribute, value);
    } else {
      element.setAttribute(attribute, defaultValue);
    }
  },

  toggleAttribute(element, attribute) {
    element.toggleAttribute(attribute);
  },
};
