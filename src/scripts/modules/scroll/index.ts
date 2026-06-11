import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { dom } from './dom';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function initScrolling() {
  const { localLinks, fadeSections } = dom;

  if (!localLinks || !fadeSections) {
    return;
  }

  const isMobile = globalThis.matchMedia('(max-width: 768px)');
  let smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.4,
    effects: true,
  });

  function updateSmooth() {
    if (isMobile.matches) {
      smoother.kill();
      ScrollTrigger.refresh();
    } else {
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.4,
        effects: true,
      });
    }
  }
  updateSmooth();

  isMobile.addEventListener('change', () => {
    updateSmooth();
  });

  let isScrolling = false;
  document.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement).closest<HTMLLinkElement>('[data-local-link]');
    const linkText = link?.querySelector('span');

    if (!link) return;

    event.preventDefault();
    isScrolling = true;

    const target = link.getAttribute('href');
    const position = smoother.offset(target, 'top 64px');

    smoother.scrollTo(position, true);

    for (const link of localLinks) {
      const linkText = link.querySelector('span');
      linkText?.classList.remove('menu__text--is-active');
    }
    linkText?.classList.add('menu__text--is-active');

    gsap.delayedCall(1, () => {
      isScrolling = false;
      console.log(isScrolling);
    });
  });

  for (const link of localLinks) {
    const targetSelector = link.getAttribute('href');
    if (!targetSelector) continue;

    const targetSection = document.querySelector(targetSelector);
    const linkText = link.querySelector('span');
    if (!targetSection || !linkText) continue;

    ScrollTrigger.create({
      trigger: targetSection,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        if (isScrolling) return;
        linkText.classList.add('menu__text--is-active');
      },
      onLeave: () => {
        if (isScrolling) return;
        linkText.classList.remove('menu__text--is-active');
      },
      onEnterBack: () => {
        if (isScrolling) return;
        linkText.classList.add('menu__text--is-active');
      },
      onLeaveBack: () => {
        if (isScrolling) return;
        linkText.classList.remove('menu__text--is-active');
      },
    });
  }

  for (const section of fadeSections) {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'center center',
        // scrub: true,
        markers: false,
      },
      x: -200,
      opacity: 0,
      duration: 1,
    });
  }
}
initScrolling();
