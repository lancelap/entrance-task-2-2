const FLOOR = 'floor';
const SUN = 'sun';
const TEMP = 'temperature';

// MENU 
const mainNav = document.querySelector(".main-nav");
const navToggle = document.querySelector(".header__nav-toggle");

const featuredNav = document.querySelector(".featured-nav");
const featuredNavToggle = document.querySelector(".devices__toggle");
const featuredButton = document.querySelector(".featured-nav__button");

toggle(mainNav, navToggle, "nav");
toggle(featuredNav, featuredNavToggle, "featured-nav");
toggle(featuredNav, featuredNavToggle, "nav");

function toggle(nav, toggle, classNameNav) {
  toggle.addEventListener("click", function(event) {
    if (nav.classList.contains(classNameNav + "--closed")) {
      nav.classList.remove(classNameNav + "--closed");
      nav.classList.add(classNameNav + "--opened");
    } else if(nav.classList.contains(classNameNav + "--opened")) {
      nav.classList.add(classNameNav + "--closed");
      nav.classList.remove(classNameNav + "--opened");
    } else {
      nav.classList.add(classNameNav + "--opened");
    }
  });
}

// MODAL 
const rootModal = document.querySelector('.modal');
const lists = document.querySelectorAll(".elementnav__list");
const pageContent = document.querySelector(".page__content");

addListListner(lists);

function toggleModal(name, state, typeDevice) {
  if (rootModal.classList.contains('modal--opened')) {
    pageContent.classList.remove('page__content--blured', 'page__content--no-scroll');
    rootModal.classList.add('modal--closed');
    rootModal.classList.remove('modal--opened');
  } else {
    rootModal.innerHTML = '';
    const modal = renderModal(name, state, typeDevice);
    pageContent.classList.add('page__content--blured', 'page__content--no-scroll');
    rootModal.classList.add('modal--opened');
    rootModal.classList.remove('modal--closed');
    
    rootModal.appendChild(modal);
  }
}

function renderContent(name, state, typeDevice) {
  const block = document.createElement('div');
  block.classList.add('controller', 'modal__line');

  const head = renderHead(name, state, typeDevice);
  const controller = renderController(typeDevice);

  block.appendChild(head);
  block.appendChild(controller);

  return block
}

function renderController(typeDevice) {
  const root = document.createElement('div');

  if (typeDevice === SUN || typeDevice === TEMP) {
    root.classList.add('device-bar');
    typeDevice === TEMP ? root.classList.add('device-bar--temp') : root.classList.add('device-bar--light');
    root.classList.add('device-bar', 'controller__bar');
  
    const track = document.createElement('div');
    track.classList.add('device-bar__track');
    track.setAttribute('style', 'top: 105px');
    root.appendChild(track);

    addControllerListner(root, track)
  } else {
    root.classList.add('termometr', 'controller__termometr');
    const scale = document.createElement('div');
    scale.classList.add('termometr__scale');
    scale.classList.add('termometr__scale');

    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    const circle = document.createElementNS(NS, "circle");
    const title = document.createElementNS(NS, "title");
    circle.setAttribute("r", 16);
    circle.setAttribute("cx", 16);
    circle.setAttribute("cy", 16);
    circle.classList.add('termometr__circle');
    svg.setAttribute("viewBox", "0 0 32 32");
    svg.classList.add('termometr__svg');
    title.textContent = 'circle';
    svg.appendChild(title);
    svg.appendChild(circle);
    scale.appendChild(svg);

    const bg = document.createElement('div');
    bg.classList.add('termometr__bg');

    const value = document.createElement('b');
    value.classList.add('termometr__value');
    value.textContent = '+23';

    const arrow = document.createElement('div');
    arrow.classList.add('termometr__arrow');
    arrow.setAttribute('style', 'transform: rotate(104deg)');

    root.appendChild(scale);
    root.appendChild(bg);
    root.appendChild(value);
    root.appendChild(arrow);

    addTermometrListner(root, arrow)
  }

  return root
}

function renderHead(name, state, typeDevice) {
  const root = document.createElement('div');

  const controllerLine = document.createElement('div');
  controllerLine.classList.add('controller__line', 'controller__temp-info');

  const controllerTitle = document.createElement('h1');
  controllerTitle.classList.add('controller__title');
  controllerTitle.textContent = name;
  controllerLine.appendChild(controllerTitle);

  const weather = document.createElement('div');
  weather.classList.add('weather', 'controller__weather', 'controller__only-desktop');

  const weatherInfo = document.createElement('p');
  weatherInfo.classList.add('weather__info', 'weather__info--with-icon', 'controller__weather-info');
  weather.appendChild(weatherInfo);

  const weatherIcon = document.createElement('span');
  weatherIcon.classList.add('weather__icon', 'controller__weather-icon');
  weather.appendChild(weatherIcon);

  if (typeDevice === SUN) {
    weatherIcon.classList.add('weather__icon--sun');
  } else {
    const content = document.createTextNode("+23");
    weatherInfo.appendChild(content);
    weatherIcon.classList.add('weather__icon--temperature2');
  }
  controllerLine.appendChild(weather);

  const controllerState = document.createElement('p');
  controllerState.classList.add('controller__state');
  controllerState.textContent = state;
  controllerLine.appendChild(controllerState);

  root.appendChild(controllerLine);

  if (typeDevice === SUN) {
    root.appendChild(renderMenu(['Вручную', 'Дневной свет', 'Вечерний свет', 'Рассвет']));
  } else if (typeDevice === TEMP) {
    root.appendChild(renderMenu(['Вручную', 'Холодно', 'Тепло', 'Жарко']));
  }

  return root
}

function renderMenu(items) {
  const list = document.createElement('ul');
  list.classList.add('elementnav__list', 'controller__places-list');

  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('elementnav__item', 'controller__places-item');
    const button = document.createElement('button');
    button.classList.add('button');

    index === 0 ?  button.classList.add('button--active') : null;
    index === items.length - 1 ?  button.classList.add('controller__only-desktop') : null;
    button.textContent = item;

    li.appendChild(button);
    list.appendChild(li);
  })

  const elementnav = document.createElement('div');
  elementnav.classList.add('elementnav', 'controller__elementnav');
  const wrapper = document.createElement('div');
  wrapper.classList.add('elementnav__wrapper');

  wrapper.appendChild(list);
  elementnav.appendChild(wrapper);

  return elementnav
}

function renderModal(name, state, typeDevice) {
  const modal = document.createElement('section');
  modal.classList.add('modal__content');

  if (typeDevice === TEMP || typeDevice === SUN) {
    modal.classList.add('modal__bar');
  } else {
    modal.classList.add('modal__termometr');
  }
  

  const blockBtn = document.createElement('div');
  blockBtn.classList.add('modal__block-btn');

  const applyBtn = document.createElement('button');
  applyBtn.classList.add('button', 'button--active', 'modal__btn', 'modal__btn--active');
  applyBtn.textContent = 'Применить';
  applyBtn.setAttribute('id', 'applyBtn');
  blockBtn.appendChild(applyBtn);

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('button', 'modal__btn');
  closeBtn.textContent = 'Закрыть';
  closeBtn.setAttribute('id', 'closeBtn');
  blockBtn.appendChild(closeBtn);
  
  const content = renderContent(name, state, typeDevice);

  modal.appendChild(content);
  modal.appendChild(blockBtn);

  addButtonListner(applyBtn, toggleModal);
  addButtonListner(closeBtn, toggleModal);

  return modal;
}

function addListListner (lists) {
  lists.forEach(element => {
    delegateClicks(element)
  });
}

function delegateClicks(element) {
  element.addEventListener("click", event => {
    let target = event.target;

    while (target != element) {
      const type = target.getAttribute('data-type');

      if (type === 'device') {
        const name = target.getAttribute('data-name');
        const state = target.getAttribute('data-state');
        const typeDevice = target.getAttribute('data-type-device');
        toggleModal(name, state, typeDevice);
        return;
      }

      target = target.parentNode;
    }
  })
}

// FILTER
const filterNav = document.querySelector(".featured-nav__list");
const devicesList = document.getElementById('devices');

addFilterListner(filterNav, featuredButton);

function addFilterListner(element, toggleButton) {
  element.addEventListener("click", event => {
    let target = event.target;
    event.preventDefault();
    
    while (target != element) {
      const filterPlace = target.getAttribute('data-filter-place');
      const filterType = target.getAttribute('data-filter-type');
      const filter = filterPlace !== null ? filterPlace : filterType;

      if (filter) {
        // Заменем текст кнопки переключателя
        const targetButton = target.querySelector('button');
        toggleButton.firstChild.textContent = targetButton.textContent;

        // переключаем состояние кнопок
        const buttonActive = document.querySelector('.featured-nav__list .button--active');
        buttonActive.classList.remove('button--active');
        targetButton.classList.add('button--active');

        // Закрывем меню
        featuredNav.classList.add("featured-nav--closed");
        featuredNav.classList.remove("featured-nav--opened");
        featuredNav.classList.add("nav--closed");
        featuredNav.classList.remove("nav--opened");
        

        // Скрываем элементы списка
        for (let index = 0; index < devicesList.childNodes.length; index++) {
          const element = devicesList.childNodes[index];
          if (element.nodeType != 1) continue;
          
          const placeDevice = element.getAttribute('data-place');
          const typeDevice = element.getAttribute('data-type-device');
          element.classList.add('visuallyhidden');
          
          if (placeDevice === filter || typeDevice === filter || filter === 'none' ) {
            element.classList.remove('visuallyhidden');
          }
        }
        return;
      }
      target = target.parentNode;
    }
  })
}

// CONTROLLER
const deviceBar = document.querySelector(".device-bar");
const deviceTrack = document.querySelector(".device-bar__track");

const termometr = document.querySelector(".controller__termometr");
const termometrArrow = document.querySelector(".termometr__arrow");
 
if (deviceBar) { addControllerListner(deviceBar, deviceTrack) };
function addControllerListner(deviceBar, deviceTrack) {

  deviceBar.addEventListener('mousedown', e => {
    var barCoords = getCoords(deviceBar);
 
    let newTop = e.pageY - barCoords.top - deviceTrack.offsetHeight / 2;
    let newLeft = e.pageX - barCoords.left - deviceTrack.offsetWidth / 2;
    if (newTop < 0) { newTop = 0 }
    if (newLeft < 0) { newLeft = 0 }
    
    let bottomEdge = deviceBar.offsetHeight - deviceTrack.offsetHeight;
    let rightEdge = deviceBar.offsetWidth - deviceTrack.offsetWidth;
    if (newTop > bottomEdge) { newTop = bottomEdge }
    if (newLeft > rightEdge) { newLeft = rightEdge }
    deviceTrack.style.top = newTop + 'px';
    deviceTrack.style.left = newLeft + 'px';
  })
}

function getCoords(elem) {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

// CONTROLLER MENU

if (termometr) { addTermometrListner(termometr, termometrArrow) };
function addTermometrListner(termometr, termometrArrow) {
  termometr.addEventListener('click', e => {
    let target = e.target;
    const terCoord = getCoords(termometr);
    const x = ((e.pageX - terCoord.left) - termometr.offsetWidth / 2) / 110.5;
    const y = ((((e.pageY - terCoord.top) - termometr.offsetHeight / 2) * -1) / 110.5);

    let angle = (Math.atan2(y, x) * 180) / Math.PI;
    angle <= 0 ? angle += 360 : angle = angle;

    termometrArrow.setAttribute('style', `transform: rotate(${-(angle - 90)}deg)`);
  })
}

// featuredScripts
const featuredScripts = document.getElementById('featured-scripts');

addfeaturedScriptsListener();

function addfeaturedScriptsListener() {
  const items = featuredScripts.querySelectorAll('.general__item');

  const scrollTop = featuredScripts.scrollTop;
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

function arrowFunc(e) {
  featuredScripts.scrollTop += 120; 
  e.stopPropagation();
}

featuredScripts.addEventListener('scroll', throttle(() => {
  addfeaturedScriptsListener();
}, 400))

// SLIDER
const scriptsSlider = document.querySelector('.scripts__slider');
const navScripts = document.getElementById('nav-featured-scripts');
const navDevicesScripts = document.getElementById('nav-featured-devices');

addNavArrowListner(navScripts, scriptsSlider, 685);
addNavArrowListner(navDevicesScripts, devicesList, 215);

function addNavArrowListner (nav, list, scrollLeft) {
  const leftArrow = nav.querySelector('.arrows-nav__arrow--left');
  const rightArrow = nav.querySelector('.arrows-nav__arrow--right');

  check();

  const quadEaseOut = makeEaseOut(quad);
  
  leftArrow.addEventListener('click', () => {
    const start = list.scrollLeft;
    animate({
      duration: 300,
      timing: quadEaseOut,
      draw: function(progress) {
        list.scrollLeft = start - (progress * scrollLeft);
      }
    })
  })

  rightArrow.addEventListener('click', () => {
    const start = list.scrollLeft;
    animate({
      duration: 300,
      timing: quadEaseOut,
      draw: function(progress) {
        list.scrollLeft = start + (progress * scrollLeft);
      }
    })
  })

  list.addEventListener('scroll', throttle(check, 300))

  function quad(timeFraction) {
    return Math.pow(timeFraction, 2)
  }
  
  function makeEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    }
  }

  function check() {
    if (list.scrollLeft === 0) { 
      toggleArrow(leftArrow, true);
    } else {
      toggleArrow(leftArrow, false);
    }

    if (list.scrollLeft + list.clientWidth >= list.scrollWidth) { 
      toggleArrow(rightArrow, true);
    } else {
      toggleArrow(rightArrow, false);
    }
  }

  function toggleArrow(arrow, disabled) {
    if (disabled) {
      arrow.setAttribute('disabled', 'disabled');
      arrow.setAttribute('tabindex', '-1');
      arrow.classList.remove('arrows-nav__arrow--active');
    } else {
      arrow.removeAttribute('disabled');
      arrow.setAttribute('tabindex', '0');
      arrow.classList.add('arrows-nav__arrow--active');
    }
  }
}

function animate(options) {

  const start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction от 0 до 1
    let timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    // текущее состояние анимации
    const progress = options.timing(timeFraction)

    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
// 
function addButtonListner(element, func) {
  element.addEventListener('click', () => {
    func();
  })
}

function throttle(func, ms) {

  let isThrottled = false, savedArgs, savedThis;

  function wrapper() {

    if (isThrottled) { 
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); 

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; 
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}