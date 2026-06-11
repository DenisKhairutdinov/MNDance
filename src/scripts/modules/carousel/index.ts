import { dom } from './dom';

function initCarousel() {
  const { carouselTrack, carouselSlides, carouselNextButton, carouselPrevButton, carouselDots } =
    dom;

  if (
    !carouselTrack ||
    !carouselSlides ||
    !carouselNextButton ||
    !carouselPrevButton ||
    !carouselDots
  ) {
    return;
  }

  const isMobile = globalThis.matchMedia('(max-width: 768px)');
  let slideWidth = 100;
  let translateHalfStep = 0;
  let index = 4;
  let dotIndex = 0;

  function updateVars() {
    if (isMobile.matches) {
      slideWidth = 100;
      translateHalfStep = 0;
    } else {
      slideWidth = 50;
      translateHalfStep = slideWidth / 2;
    }
  }
  updateVars();
  isMobile.addEventListener('change', () => {
    updateVars();
    carouselTrack.style.translate = `-${index * slideWidth - translateHalfStep}%`;
  });

  carouselTrack.style.translate = `-${index * slideWidth - translateHalfStep}%`;

  function setTrackPosition() {
    carouselTrack?.addEventListener('transitionend', () => {
      carouselTrack.style.transition = 'none';
      carouselTrack.style.translate = `-${index * slideWidth - translateHalfStep}%`;
    });
  }

  function updateDotsState() {
    dotIndex = index - 2;

    if (!carouselDots) {
      return;
    }

    for (const dot of carouselDots.children) {
      if (!(dot instanceof HTMLElement)) {
        continue;
      }

      dot.classList.remove('dance-styles__dot--is-active');
    }
    carouselDots.children[dotIndex].classList.add('dance-styles__dot--is-active');
  }

  carouselPrevButton.addEventListener('click', () => {
    index--;
    carouselTrack.style.transition = 'translate 250ms cubic-bezier(0, 0.55, 0.45, 1)';
    carouselTrack.style.translate = `-${index * slideWidth - translateHalfStep}%`;

    if (index === 1) {
      index = carouselSlides.length - 3;
      setTrackPosition();
    }
    updateDotsState();
  });

  carouselNextButton.addEventListener('click', () => {
    index++;
    carouselTrack.style.transition = 'translate 250ms cubic-bezier(0, 0.55, 0.45, 1)';
    carouselTrack.style.translate = `-${index * slideWidth - translateHalfStep}%`;

    if (index === carouselSlides.length - 2) {
      index = 2;
      setTrackPosition();
    }
    updateDotsState();
  });
}
initCarousel();
