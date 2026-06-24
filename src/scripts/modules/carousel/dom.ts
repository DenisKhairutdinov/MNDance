export const dom = {
  carouselTrack: document.querySelector<HTMLElement>('[data-carousel-slides]'),
  carouselSlides: document.querySelectorAll<HTMLElement>('[data-carousel-slide]'),
  carouselNextButton: document.querySelector<HTMLButtonElement>('[data-dance-styles-next-button]'),
  carouselPrevButton: document.querySelector<HTMLButtonElement>('[data-dance-styles-prev-button]'),
  carouselDots: document.querySelector<HTMLElement>('[data-dance-styles-dots]'),
};
