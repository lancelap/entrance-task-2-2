import throttle from './utils/throttle';
import makeEaseOut from './utils/makeEaseOut';
import animate from './utils/animate';

export default function Gallery({ list, controls, width }) {
  this.list = list;
  this.controls = controls;
  this.width = width;
  this.quadEaseOut = makeEaseOut(timeFraction => Math.pow(timeFraction, 2));

  this.controls.addEventListener('click', event => {
    const target = event.target;

    const action = target.getAttribute('data-action');
    if (action) {
      this[action]();
    }
  });

  this.list.addEventListener('scroll', throttle(() => this.check(), 200));
  this.check();
}

Gallery.prototype.check = function() {
  const prev = this.controls.querySelector('.arrows-nav__arrow--left');
  const next = this.controls.querySelector('.arrows-nav__arrow--right');
  
  if (this.list.scrollLeft === 0) {
    disable(prev);
  } else {
    enable(prev);
  }

  if (this.list.scrollLeft + this.list.clientWidth >= this.list.scrollWidth) {
    disable(next);
  } else {
    enable(next);
  }

  function disable(arrow) {
    arrow.setAttribute('disabled', 'disabled');
    arrow.setAttribute('tabindex', '-1');
    arrow.classList.remove('arrows-nav__arrow--active');
  };

  function enable(arrow) {
    arrow.removeAttribute('disabled');
    arrow.setAttribute('tabindex', '0');
    arrow.classList.add('arrows-nav__arrow--active');
  };
};

Gallery.prototype.next = function() {
  const start = this.list.scrollLeft;

  animate({
    duration: 300,
    timing: this.quadEaseOut,
    draw: progress => {
      this.list.scrollLeft = start + progress * this.width;
    }
  });
};

Gallery.prototype.prev = function() {
  const start = this.list.scrollLeft;

  animate({
    duration: 300,
    timing: this.quadEaseOut,
    draw: progress => {
      this.list.scrollLeft = start - progress * this.width;
    }
  });
};
