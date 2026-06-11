import { globalHandlers } from '../global/global-handlers';
import { dom } from './dom';

function initTeam() {
  const { mentors } = dom;

  if (!mentors) {
    return;
  }

  mentors.addEventListener('click', (event) => {
    const mentorCard = (event.target as HTMLElement).closest<HTMLElement>('[data-mentor-card]');

    if (!mentorCard) {
      return;
    }

    const mentorInfo = mentorCard.querySelector<HTMLElement>('[data-mentor-info]');
    const mentorButton = mentorCard.querySelector<HTMLButtonElement>('[data-mentor-button]');

    if (!mentorInfo || !mentorButton) return;

    globalHandlers.toggleClassName(mentorInfo, 'mentor__info--is-active');
    globalHandlers.switchAttribute(mentorButton, 'aria-expanded', 'false', 'true');
  });
}
initTeam();
