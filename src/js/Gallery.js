import makeEaseOut from './utils/makeEaseOut';
import animate from './utils/animate';

export default function Gallery({ list, controls, width }) {
  this.list = list;
  this.controls = controls;
  this.isAnimate = false;
  this.quadEaseOut = makeEaseOut(timeFraction => Math.pow(timeFraction, 2));

  this.controls.addEventListener('click', event => {
    if(this.isAnimate) {
      return;
    }
    const target = event.target;

    const action = target.getAttribute('data-action');
    if (action) {
      this[action]();
    }
  });

  this.check();
}

Gallery.prototype.check = function() {
  const prev = this.controls.querySelector('.arrows-nav__arrow--left');
  const next = this.controls.querySelector('.arrows-nav__arrow--right');
  const scrollLeft = this.list.scrollLeft;
  const scrollWidth = this.list.scrollWidth;
  const clientWidth = this.list.clientWidth;

  if (scrollLeft === 0) {
    disable(prev);
  } else {
    enable(prev);
  }

  if (
    scrollLeft + clientWidth >= scrollWidth ||
    scrollWidth - scrollLeft < this.list.firstElementChild.clientWidth * 2
  ) {
    disable(next);
  } else {
    enable(next);
  }

  function disable(arrow) {
    arrow.setAttribute('disabled', 'disabled');
    arrow.setAttribute('tabindex', '-1');
    arrow.classList.remove('arrows-nav__arrow--active');
  }

  function enable(arrow) {
    arrow.removeAttribute('disabled');
    arrow.setAttribute('tabindex', '0');
    arrow.classList.add('arrows-nav__arrow--active');
  }
};

Gallery.prototype.next = function() {
  this.switch('NEXT');
};

Gallery.prototype.prev = function() {
  this.switch('PREV');
};

Gallery.prototype.switch = function(action) {
  const start = this.list.scrollLeft;
  const width = this.list.scrollWidth / this.list.children.length;

  this.isAnimate = true;
  animate({
    duration: 300,
    timing: this.quadEaseOut,
    draw: progress => {
      switch (action) {
      case 'NEXT':
        this.list.scrollLeft = start + progress * width;
        break;

      case 'PREV':
        this.list.scrollLeft = start - progress * width;
        break;
      }
    },
    callback: () => {
      this.isAnimate = !this.isAnimate;
      this.check();
    }
  });
};
