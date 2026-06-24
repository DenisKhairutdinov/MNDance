export const dom = {
  styleSelectButton: document.querySelector<HTMLButtonElement>('[data-style-select-button]'),
  styleSelectOptions: document.querySelector<HTMLElement>('[data-style-select-options]'),
  joinModal: document.querySelector<HTMLDialogElement>('[data-join-modal]'),
  form: document.querySelector<HTMLFormElement>('[data-form]'),
  formButton: document.querySelector<HTMLButtonElement>('[data-form-button]'),
  telInput: document.querySelector<HTMLInputElement>('[data-tel-input]'),
  nameInput: document.querySelector<HTMLInputElement>('[data-name-input]'),
  inputValueError: document.querySelector<HTMLElement>('[data-form-error-value]'),
  inputFormatError: document.querySelector<HTMLElement>('[data-form-error-format]'),
  joinModalScreens: document.querySelectorAll<HTMLElement>('[data-join-modal-screen]'),
};
