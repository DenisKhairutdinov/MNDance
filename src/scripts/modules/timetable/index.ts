import { dom } from './dom';

function initTimetable() {
  const { timetableControls, timetableWrapper, timetableDots } = dom;

  if (!timetableControls || !timetableWrapper || !timetableDots) {
    return;
  }

  let endTable = false;

  timetableControls.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
      '[data-timetable-button]',
    );

    if (!button) {
      return;
    }

    for (const button of timetableControls.children) {
      if (!(button instanceof HTMLElement)) {
        continue;
      }

      button.classList.toggle(`${button.classList[0]}--is-active`);
      button.toggleAttribute('disabled');
      if (button.getAttribute('aria-disabled') === 'false') {
        button.setAttribute('aria-disabled', 'true');
      } else {
        button.setAttribute('aria-disabled', 'false');
      }

      for (const dot of timetableDots.children) {
        if (!(dot instanceof HTMLElement)) {
          continue;
        }

        dot.classList.toggle('timetable__dot--is-active');
      }
    }

    timetableWrapper.classList.toggle('timetable__wrapper--end');
    endTable = endTable ? false : true;
  });

  // Swipe
  let touchStartX = 0;
  let touchEndX = 0;

  const minSwipeDistance = 50;
  timetableWrapper.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });
  timetableWrapper.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    checkSwipe();
  });

  function toggleControlsState() {
    if (!timetableControls || !timetableDots || !timetableWrapper) {
      return;
    }

    for (const button of timetableControls.children) {
      if (!(button instanceof HTMLElement)) {
        continue;
      }
      button.classList.toggle(`${button.classList[0]}--is-active`);
      button.toggleAttribute('disabled');
      if (button.getAttribute('aria-disabled') === 'false') {
        button.setAttribute('aria-disabled', 'true');
      } else {
        button.setAttribute('aria-disabled', 'false');
      }
    }

    for (const dot of timetableDots.children) {
      if (!(dot instanceof HTMLElement)) {
        continue;
      }
      dot.classList.toggle('timetable__dot--is-active');
    }

    timetableWrapper.classList.toggle('timetable__wrapper--end');
  }

  function checkSwipe() {
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        if (endTable) {
          toggleControlsState();
          endTable = false;
        }
      } else {
        if (!endTable) {
          toggleControlsState();
          endTable = true;
        }
      }
    }
  }
}
initTimetable();
