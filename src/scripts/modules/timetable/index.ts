import { globalHandlers } from '../global/global-handlers';
import { dom } from './dom';

function initTimetable() {
  const { timetableControls, timetableWrapper, timetableDots } = dom;

  if (!timetableControls || !timetableWrapper || !timetableDots) {
    return;
  }

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

      globalHandlers.toggleClassName(button, `${button.classList[0]}--is-active`);
      globalHandlers.switchAttribute(button, 'aria-disabled', 'true', 'false');
      globalHandlers.toggleAttribute(button, 'disabled');

      for (const dot of timetableDots.children) {
        if (!(dot instanceof HTMLElement)) {
          continue;
        }

        globalHandlers.toggleClassName(dot, 'timetable__dot--is-active');
      }
    }

    globalHandlers.toggleClassName(timetableWrapper, 'table__wrapper--end');
  });
}
initTimetable();
