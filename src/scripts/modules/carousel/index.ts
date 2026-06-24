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
  let index = 2;
  let dotIndex = 0;

  let animateIsWork = false;

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

  carouselTrack.style.translate = `-${index * slideWidth - translateHalfStep}%`;
  isMobile.addEventListener('change', () => {
    updateVars();
    carouselTrack.style.translate = `-${index * slideWidth - translateHalfStep}%`;
  });

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

  function updateSlide() {
    for (const [slideIndex, slide] of carouselSlides.entries()) {
      slide.classList.remove('dance-styles__item--is-active');
      slide.setAttribute('aria-hidden', 'true');

      if (Number(slide.dataset.index) === index) {
        slide.classList.add('dance-styles__item--is-active');
        slide.setAttribute('aria-hidden', 'false');

        if (slideIndex > 0 && slideIndex <= 7) {
          carouselSlides[slideIndex + 1].style.transformOrigin = '0 50%';
          carouselSlides[slideIndex - 1].style.transformOrigin = '100% 50%';
        }
      }
    }
  }
  updateSlide();

  carouselPrevButton.addEventListener('click', () => {
    if (animateIsWork) {
      return;
    }
    animateIsWork = true;
    setTimeout(() => {
      animateIsWork = false;
      console.log(123);
    }, 250);

    index--;
    carouselTrack.style.transition = 'translate 250ms cubic-bezier(0, 0.55, 0.45, 1)';
    carouselTrack.style.translate = `-${index * slideWidth - translateHalfStep}%`;

    if (index === 1) {
      index = carouselSlides.length - 3;
      setTrackPosition();
    }
    updateDotsState();
    updateSlide();
  });

  carouselNextButton.addEventListener('click', () => {
    if (animateIsWork) {
      return;
    }
    animateIsWork = true;
    setTimeout(() => {
      animateIsWork = false;
      console.log(123);
    }, 250);

    index++;
    carouselTrack.style.transition = 'translate 250ms cubic-bezier(0, 0.55, 0.45, 1)';
    carouselTrack.style.translate = `-${index * slideWidth - translateHalfStep}%`;
    if (index === carouselSlides.length - 2) {
      index = 2;
      setTrackPosition();
    }
    updateDotsState();
    updateSlide();
  });

  // Swipe
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50;

  function checkSwipe() {
    if (!carouselTrack) {
      return;
    }
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        index--;
        carouselTrack.style.transition = 'translate 250ms cubic-bezier(0, 0.55, 0.45, 1)';
        carouselTrack.style.translate = `-${index * slideWidth - translateHalfStep}%`;

        if (index === 1) {
          index = carouselSlides.length - 3;
          setTrackPosition();
        }
        updateDotsState();
        updateSlide();
      } else {
        index++;
        carouselTrack.style.transition = 'translate 250ms cubic-bezier(0, 0.55, 0.45, 1)';
        carouselTrack.style.translate = `-${index * slideWidth - translateHalfStep}%`;

        if (index === carouselSlides.length - 2) {
          index = 2;
          setTrackPosition();
        }
        updateDotsState();
        updateSlide();
      }
    }
  }

  carouselTrack.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });
  carouselTrack.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    checkSwipe();
  });
}
initCarousel();
