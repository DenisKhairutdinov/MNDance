import { pubSub } from '../global/pubsub';
import type { EventName } from '../global/pubsub';
import { dom } from './dom';

function toggleModal(subEvent: EventName, modal: HTMLDialogElement) {
  pubSub.subscribe(subEvent, () => {
    if (modal.open) {
      modal.close();
    } else {
      modal.showModal();
    }
  });
}

function resetButtonState(subEvent: EventName, button: HTMLButtonElement) {
  pubSub.subscribe(subEvent, () => {
    button.setAttribute('aria-expanded', 'false');
  });
}

function initModals() {
  const { modals, buttons } = dom;

  if (!modals || !buttons) {
    return;
  }

  let lastClickedButton: HTMLButtonElement;

  for (const modal of modals) {
    toggleModal(modal.dataset.subEvent as EventName, modal);
    modal.addEventListener('close', () => {
      pubSub.publish(modal.dataset.pubEvent as EventName);
      lastClickedButton.focus();
    });
  }

  for (const button of buttons) {
    resetButtonState(button.dataset.subEvent as EventName, button);
  }

  document.addEventListener('click', (event) => {
    const eventButton = (event.target as HTMLElement).closest<HTMLButtonElement>(
      '[data-event-button]',
    );
    const eventLink = (event.target as HTMLElement).closest<HTMLLinkElement>('[data-event-link]');

    if (!eventButton && !eventLink) return;

    if (eventButton) {
      lastClickedButton = eventButton;
      pubSub.publish(eventButton.dataset.pubEvent as EventName);
      lastClickedButton.setAttribute('aria-expanded', 'true');
    }

    if (eventLink) {
      pubSub.publish(eventLink.dataset.pubEvent as EventName);
      lastClickedButton.setAttribute('aria-expanded', 'true');
    }
  });
}
initModals();
