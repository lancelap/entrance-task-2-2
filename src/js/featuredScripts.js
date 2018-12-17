import throttle from './utils/throttle';

export default function featuredScripts() {
  const scripts = document.getElementById('featured-scripts');

  addfeaturedScriptsListener(scripts);

  scripts.addEventListener(
    'scroll',
    throttle(() => {
      addfeaturedScriptsListener(scripts);
    }, 400)
  );
}

function addfeaturedScriptsListener(scripts) {
  const items = scripts.querySelectorAll('.general__item');

  if (window.innerWidth < 1364) {
    return;
  }

  const scrollTop = scripts.scrollTop;
  if (items[2] !== null) {
    if (scrollTop > 0) {
      items[2].removeEventListener('click', arrowFunc(scripts));
      items[2].classList.remove('elementnav__item--with-arrow');
    } else if (scrollTop === 0) {
      items[2].classList.add('elementnav__item--with-arrow');
      items[2].addEventListener('click', arrowFunc(scripts));
    }
  }
}

const arrowFunc = scripts => event => {
  scripts.scrollTop += 120;
  event.stopPropagation();
};
