import { dom } from './dom';
import { gsap } from 'gsap';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

function initMenu() {
  const { menuButton, menuWrapper } = dom;
  let menuIsOpen = false;

  if (!menuButton || !menuWrapper) {
    return;
  }

  const startPaths = gsap.utils.toArray<SVGPathElement>('[data-menu-start-icon] path');
  const midPaths = gsap.utils.toArray<SVGPathElement>('[data-menu-mid-icon] path');
  const endPaths = gsap.utils.toArray<SVGPathElement>('[data-menu-end-icon] path');
  const timeline = gsap.timeline({ paused: true, reversed: true });

  for (const [index, path] of startPaths.entries()) {
    timeline.to(
      path,
      {
        morphSVG: midPaths[index],
        duration: 0.15,
        ease: 'power2.in',
      },
      'toMid',
    );
  }

  for (const [index, path] of startPaths.entries()) {
    timeline.to(
      path,
      {
        morphSVG: endPaths[index],
        duration: 0.25,
        ease: 'power2.out',
      },
      'toEnd',
    );
  }

  function openCloseMenu() {
    if (!menuButton || !menuWrapper) {
      return;
    }

    menuButton.classList.toggle('menu-button--is-active');
    menuWrapper.classList.toggle('menu__wrapper--is-active');

    if (menuButton.getAttribute('aria-expanded') === 'false') {
      menuButton.setAttribute('aria-expanded', 'true');
    } else {
      menuButton.setAttribute('aria-expanded', 'false');
    }

    if (menuWrapper.getAttribute('aria-hidden') === 'true') {
      menuWrapper.setAttribute('aria-hidden', 'false');
    } else {
      menuWrapper.setAttribute('aria-hidden', 'true');
    }
  }

  menuButton.addEventListener('click', () => {
    if (timeline.reversed()) {
      timeline.play();
    } else {
      timeline.reverse();
    }
    openCloseMenu();
    menuIsOpen = menuIsOpen ? false : true;
  });

  document.addEventListener('click', (event) => {
    if (
      event.target instanceof Node &&
      !menuButton.contains(event.target) &&
      !menuWrapper.contains(event.target) &&
      menuIsOpen
    ) {
      if (timeline.reversed()) {
        timeline.play();
      } else {
        timeline.reverse();
      }
      openCloseMenu();
      menuIsOpen = false;
    }
  });
}
initMenu();
