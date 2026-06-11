import { pubSub } from '../global/pubsub';
import type { EventName } from '../global/pubsub';
import { globalHandlers } from '../global/global-handlers';
import { dom } from './dom';

function initModals() {
  const { modals, buttons } = dom;

  if (!modals || !buttons) {
    return;
  }

  let lastClickedButton: HTMLButtonElement;

  for (const modal of modals) {
    globalHandlers.toggleModal(modal.dataset.subEvent as EventName, modal);
    modal.addEventListener('close', () => {
      pubSub.publish(modal.dataset.pubEvent as EventName);
      lastClickedButton?.focus();
    });
  }

  for (const button of buttons) {
    globalHandlers.resetButtonState(button.dataset.subEvent as EventName, button);
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
      globalHandlers.setButtonState(lastClickedButton);
    }

    if (eventLink) {
      pubSub.publish(eventLink.dataset.pubEvent as EventName);
      globalHandlers.setButtonState(lastClickedButton);
    }
  });
}
initModals();
