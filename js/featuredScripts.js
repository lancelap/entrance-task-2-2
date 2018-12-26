import throttle from './utils/throttle';
import animate from './utils/animate';
import makeEaseOut from './utils/makeEaseOut';

export default function featuredScripts() {
  const scripts = document.getElementById('featured-scripts');

  addfeaturedScriptsListener(scripts);

  scripts.addEventListener(
    'scroll',
    throttle(() => {
      addfeaturedScriptsListener(scripts);
    }, 200)
  );

  function arrowFunc(event) {
    const start = scripts.scrollTop;
    const width = scripts.scrollHeight / scripts.children.length;

    animate({
      duration: 300,
      timing: makeEaseOut(timeFraction => Math.pow(timeFraction, 2)),
      draw: progress => {
        scripts.scrollTop = start + progress * width;
      }
    });

    event.stopPropagation();
  }

  function addfeaturedScriptsListener(scripts) {
    const items = scripts.querySelectorAll('.elementnav__item');

    const scrollTop = scripts.scrollTop;
    if (items[2] !== null) {
      if (scrollTop > 0) {
        items[2].removeEventListener('click', arrowFunc);
        items[2].classList.remove('elementnav__item--with-arrow');
      } else if (scrollTop === 0) {
        items[2].classList.add('elementnav__item--with-arrow');
        items[2].addEventListener('click', arrowFunc);
      }
    }
  }
}
