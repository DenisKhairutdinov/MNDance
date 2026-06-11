import { globalHandlers } from '../global/global-handlers';
import { dom } from './dom';
import { gsap } from 'gsap';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

function initMenu() {
  const { menuButton, menuWrapper } = dom;

  if (!menuButton || !menuWrapper) {
    return;
  }

  const startPaths = gsap.utils.toArray('[data-menu-start-icon] path') as SVGPathElement[];
  const midPaths = gsap.utils.toArray('[data-menu-mid-icon] path') as SVGPathElement[];
  const endPaths = gsap.utils.toArray('[data-menu-end-icon] path') as SVGPathElement[];
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

  menuButton.addEventListener('click', () => {
    if (timeline.reversed()) {
      timeline.play();
    } else {
      timeline.reverse();
    }

    globalHandlers.toggleClassName(menuButton, 'menu-button--is-active');
    globalHandlers.switchAttribute(menuButton, 'aria-expanded', 'false', 'true');
    globalHandlers.toggleClassName(menuWrapper, 'menu__wrapper--is-active');
  });
}
initMenu();
