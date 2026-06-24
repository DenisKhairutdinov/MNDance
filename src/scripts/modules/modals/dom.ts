export const dom = {
  modals: document.querySelectorAll<HTMLDialogElement>('[data-modal]'),
  buttons: document.querySelectorAll<HTMLButtonElement>('[data-event-button]'),
};
