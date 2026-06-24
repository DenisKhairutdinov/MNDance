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
    if (!link) {
      return;
    }

    const linkText = link.querySelector('span');

    event.preventDefault();
    isScrolling = true;

    const target = link.getAttribute('href');
    smoother.scrollTo(target, true, 'top 64px');

    for (const link of localLinks) {
      const currentSpan = link.querySelector('span');
      if (!currentSpan) {
        continue;
      }
      currentSpan.classList.remove('menu__text--is-active');
    }
    linkText?.classList.add('menu__text--is-active');

    gsap.delayedCall(1, () => {
      isScrolling = false;
    });
  });

  for (const link of localLinks) {
    const targetSelector = link.getAttribute('href');
    if (!targetSelector) {
      continue;
    }

    const targetSection = document.querySelector(targetSelector);
    const currentSpan = link.querySelector('span');
    if (!targetSection || !currentSpan) {
      continue;
    }

    ScrollTrigger.create({
      trigger: targetSection,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        if (isScrolling) return;
        currentSpan.classList.add('menu__text--is-active');
      },
      onLeave: () => {
        if (isScrolling) return;
        currentSpan.classList.remove('menu__text--is-active');
      },
      onEnterBack: () => {
        if (isScrolling) return;
        currentSpan.classList.add('menu__text--is-active');
      },
      onLeaveBack: () => {
        if (isScrolling) return;
        currentSpan.classList.remove('menu__text--is-active');
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
// window.addEventListener('load', () => {
//   setTimeout(() => {
//     initScrolling();
//   }, 150);
// });
