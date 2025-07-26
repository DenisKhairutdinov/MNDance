'use strict';

const root = document.documentElement;
const pages = document.getElementById('main');
const menu = document.getElementById('header__menu-list');
const logo = document.getElementById('header__logo');
const animationTime = 700;
let animationWork = false;
let scrollStep = 0;

//обработка колеса мыши
pages.addEventListener('wheel', function (e) {
  if (e.deltaY > 0 && scrollStep < pages.children.length - 1 && animationWork === false) {
    animationWork = true;
    scrollStep++;
    pages.children[scrollStep].style.top = 0;
    setTimeout(function () {
      animationWork = false;
    }, animationTime);
  } else if (e.deltaY > 0 && scrollStep === pages.children.length - 1 && animationWork === false) {
    animationWork = true;
    scrollStep = 0;
    for (let i = 1; i <= pages.children.length - 1; i++) {
      pages.children[i].style.top = '100%';
    }
    setTimeout(function () {
      animationWork = false;
    }, animationTime);
  } else if (e.deltaY < 0 && scrollStep > 0 && animationWork === false) {
    animationWork = true;
    pages.children[scrollStep].style.top = '100%';
    setTimeout(function () {
      animationWork = false;
    }, animationTime);
    scrollStep--;
  }

  //зависимость страницы и элемента навигации
  if (scrollStep > 0 && scrollStep <= pages.children.length - 1) {
    menu.children[scrollStep - 1].classList.add('header__menu-item--active');
    root.style.setProperty('--width', '100%');
  }
  for (let i = 0; i < menu.children.length; i++) {
    if (menu.children[scrollStep - 1] !== menu.children[i]) {
      menu.children[i].classList.remove('header__menu-item--active');
    }
  }
  if (scrollStep === 0) {
    for (let i = 0; i < menu.children.length; i++) {
      menu.children[i].classList.remove('header__menu-item--active');
    }
  }
});

//обработка клика по элементу навигации
for (let i = 0; i < menu.children.length; i++) {
  menu.children[i].addEventListener('click', function () {
    if (animationWork === false) {
      animationWork = true;
      scrollStep = i + 1;
      menu.children[i].classList.add('header__menu-item--active');
      for (let j = 0; j <= scrollStep; j++) {
        pages.children[j].style.top = 0;
      }
      for (let i = 0; i < menu.children.length; i++) {
        if (menu.children[scrollStep] !== menu.children[i + 1]) {
          menu.children[i].classList.remove('header__menu-item--active');
        }
      }
      for (let i = 0; i < pages.children.length; i++) {
        if (menu.children[scrollStep] !== menu.children[i] && scrollStep < i) {
          pages.children[i].style.top = '100%';
        }
      }
      setTimeout(function () {
        animationWork = false;
      }, animationTime);
    }
  });
}

//обработка клика по лого
logo.addEventListener('click', function () {
  scrollStep = 0;
  if (animationWork === false) {
    animationWork = true;
    for (let i = 0; i < menu.children.length; i++) {
      menu.children[i].classList.remove('header__menu-item--active');
      pages.children[i + 1].style.top = '100%';
    }
    setTimeout(function () {
      animationWork = false;
    }, animationTime);
  }
});
