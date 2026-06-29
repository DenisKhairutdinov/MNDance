export const dom = {
  localLinks: document.querySelectorAll<HTMLLinkElement>('[data-local-link]'),
  leftFadeElements: document.querySelectorAll<HTMLElement>('[data-left-fade]'),
  rightFadeElements: document.querySelectorAll<HTMLElement>('[data-right-fade]'),
  teamFadeElements: document.querySelectorAll<HTMLElement>('[data-team-series-fade]'),
  contactsFadeElements: document.querySelectorAll<HTMLElement>('[data-contacts-series-fade]'),
  priceFadeElements: document.querySelectorAll<HTMLElement>('[data-price-series-fade]'),
  timetableFadeElements: document.querySelectorAll<HTMLElement>('[data-timetable-series-fade]'),
};
