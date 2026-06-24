import { dom } from './dom';

function initJoinForm() {
  const {
    styleSelectButton,
    styleSelectOptions,
    joinModal,
    form,
    telInput,
    nameInput,
    inputValueError,
    inputFormatError,
    formButton,
    joinModalScreens,
  } = dom;

  if (
    !styleSelectButton ||
    !styleSelectOptions ||
    !joinModal ||
    !form ||
    !telInput ||
    !nameInput ||
    !inputValueError ||
    !inputFormatError ||
    !formButton ||
    !joinModalScreens
  ) {
    return;
  }

  let submitted = false;

  function openCloseOptions() {
    if (!styleSelectButton || !styleSelectOptions) {
      return;
    }

    styleSelectButton.classList.toggle('style-select__button--is-open');
    if (styleSelectButton.getAttribute('aria-expanded') === 'false') {
      styleSelectButton.setAttribute('aria-expanded', 'true');
    } else {
      styleSelectButton.setAttribute('aria-expanded', 'false');
    }

    styleSelectOptions.classList.toggle('style-select__options--is-open');
    if (styleSelectOptions.getAttribute('aria-hidden') === 'true') {
      styleSelectOptions.setAttribute('aria-hidden', 'false');
    } else {
      styleSelectOptions.setAttribute('aria-hidden', 'true');
    }
  }

  function resetJoinForm() {
    if (
      !styleSelectButton ||
      !styleSelectOptions ||
      !form ||
      !inputValueError ||
      !inputFormatError ||
      !telInput ||
      !nameInput
    ) {
      return;
    }

    styleSelectButton.classList.remove(
      'style-select__button--is-open',
      'style-select__button--selected',
    );
    styleSelectOptions.classList.remove('style-select__options--is-open');

    const buttonSpan = styleSelectButton.querySelector('span');
    if (buttonSpan) {
      buttonSpan.textContent = 'Стиль';
    }

    nameInput.classList.remove('join-form__input--error');
    telInput.classList.remove('join-form__input--error');
    inputValueError.style.display = 'none';
    inputFormatError.style.display = 'none';

    form.reset();
  }

  function simulateServerSubmit() {
    if (!formButton) {
      return;
    }

    formButton.textContent = 'Отправка...';
    formButton.classList.toggle('join-form__button--disabled');
    formButton.toggleAttribute('disabled');
    formButton.setAttribute('aria-busy', 'true');

    setTimeout(() => {
      switchScreens();
      formButton.textContent = 'Отправить';
      formButton.classList.toggle('join-form__button--disabled');
      formButton.toggleAttribute('disabled');
      formButton.setAttribute('aria-busy', 'false');
    }, 2000);
  }

  function switchScreens() {
    for (const screen of joinModalScreens) {
      screen.classList.toggle(`${screen.classList[0]}--is-active`);
    }
  }

  styleSelectButton.addEventListener('click', () => {
    openCloseOptions();
  });

  styleSelectOptions.addEventListener('click', (event) => {
    const option = (event.target as HTMLElement).closest<HTMLElement>('[data-style-select-option]');

    if (!option) {
      return;
    }

    const optionText = option.querySelector('span')?.textContent;
    const buttonSpan = styleSelectButton.querySelector('span');
    if (buttonSpan && optionText) {
      buttonSpan.textContent = optionText;
    }
    styleSelectButton.focus();
    openCloseOptions();
    styleSelectButton.classList.add('style-select__button--selected');
  });

  styleSelectOptions.addEventListener('keydown', (event) => {
    const option = (event.target as HTMLElement).closest<HTMLElement>('[data-style-select-option]');

    if (!option) {
      return;
    }
    if (event.key === 'Enter') {
      const optionText = option.querySelector('span')?.textContent;
      const buttonSpan = styleSelectButton.querySelector('span');
      if (buttonSpan && optionText) {
        buttonSpan.textContent = optionText;
      }
      styleSelectButton.focus();
      openCloseOptions();
      styleSelectButton.classList.add('style-select__button--selected');
    }
  });

  joinModal.addEventListener('close', () => {
    resetJoinForm();
    if (submitted) {
      switchScreens();
      submitted = false;
    }
  });

  telInput.addEventListener('input', (event) => {
    let inputString = (event.target as HTMLInputElement).value.replaceAll(/\D/g, '');

    if (['7', '8'].includes(inputString[0])) {
      inputString = inputString.slice(1);
    }

    let formattedResult = '+7 ';

    if (inputString.length > 0) {
      formattedResult += '(' + inputString.slice(0, 3);
    }
    if (inputString.length >= 4) {
      formattedResult += ') ' + inputString.slice(3, 6);
    }
    if (inputString.length >= 7) {
      formattedResult += '-' + inputString.slice(6, 8);
    }
    if (inputString.length >= 9) {
      formattedResult += '-' + inputString.slice(8, 10);
    }

    (event.target as HTMLInputElement).value = inputString.length === 0 ? '' : formattedResult;
  });

  form.addEventListener('submit', (event) => {
    let hasError = false;

    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
      nameInput.classList.add('join-form__input--error');
      inputValueError.style.display = 'block';
      hasError = true;
    }

    const telValue = telInput.value.trim();
    const telFormat = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

    if (telValue === '') {
      telInput.classList.add('join-form__input--error');
      inputValueError.style.display = 'block';
      hasError = true;
    } else if (!telFormat.test(telValue)) {
      telInput.classList.add('join-form__input--error');
      inputFormatError.style.display = 'block';
      hasError = true;
    }

    if (hasError) {
      event.preventDefault();
    } else {
      event.preventDefault();
      simulateServerSubmit();
      submitted = true;
    }
  });

  nameInput.addEventListener('input', () => {
    nameInput.classList.remove('join-form__input--error');
    inputValueError.style.display = 'none';
  });

  telInput.addEventListener('input', () => {
    telInput.classList.remove('join-form__input--error');
    inputValueError.style.display = 'none';
    inputFormatError.style.display = 'none';
  });
}
initJoinForm();
