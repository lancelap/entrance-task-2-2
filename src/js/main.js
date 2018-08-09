const FLOOR = 'floor';
const SUN = 'sun';
const TEMP = 'temperature';

const mainNav = document.querySelector(".main-nav");
const navToggle = document.querySelector(".main-nav__toggle");

const featuredNav = document.querySelector(".featured-nav");
const featuredNavToggle = document.querySelector(".featured-nav__toggle");

const rootModal = document.querySelector('.modal');
const lists = document.querySelectorAll(".element-list");
const pageContent = document.querySelector(".page__content");

const filterNav = document.querySelector(".featured-nav__list");
const devicesList = document.getElementById('devices');

const deviceBar = document.querySelector(".device-bar");
const deviceTrack = document.querySelector(".device-bar__track");

const termometr = document.querySelector(".controller__termometr");
const termometrArrow = document.querySelector(".termometr__arrow");


// MENU 
toggle(mainNav, navToggle, "main-nav");
toggle(featuredNav, featuredNavToggle, "featured-nav");

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
addListListner(lists);

function toggleModal(name, state, typeDevice) {
  if (rootModal.hasChildNodes()) {
    rootModal.innerHTML = '';
    pageContent.classList.remove('page__content--blured', 'page__content--no-scroll');
    rootModal.classList.add('modal--closed');
    rootModal.classList.remove('modal--opened');
  } else {
    const modal = renderModal(name, state, typeDevice);
    pageContent.classList.add('page__content--blured', 'page__content--no-scroll');
    rootModal.classList.add('modal--opened');
    rootModal.classList.remove('modal--closed');
    
    rootModal.appendChild(modal);

    const deviceBar = document.querySelector(".device-bar");
    const deviceTrack = document.querySelector(".device-bar__track");
    
    const termometr = document.querySelector(".controller__termometr");
    const termometrArrow = document.querySelector(".termometr__arrow");

    if (deviceBar) { addControllerListner(deviceBar, deviceTrack) };
    if (termometr) { addTermometrListner(termometr, termometrArrow) };
  }
}

function renderContent(name, state, typeDevice) {
  const block = document.createElement('div');
  block.classList.add('modal__block');

  const controllerBlock = document.createElement('div');
  controllerBlock.classList.add('controller');

  const head = renderHead(name, state);
  let menu = null;
  const controller = renderController(typeDevice);
  if (typeDevice === SUN) {
    menu = renderMenu(['Вручную', 'Дневной свет', 'Вечерний свет']);
  } else if (typeDevice === TEMP) {
    menu = renderMenu(['Вручную', 'Холодно', 'Тепло']);
  }

  controllerBlock.appendChild(head);
  menu !== null ? controllerBlock.appendChild(menu) : null;
  controllerBlock.appendChild(controller);

  block.appendChild(controllerBlock);

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
  } else {
    root.classList.add('termometr', 'controller__termometr');
    const scale = document.createElement('div');
    scale.classList.add('termometr__scale');
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
  }

  return root
}

function renderHead(name, state) {
  const root = document.createElement('div');

  const controllerLine = document.createElement('div');
  controllerLine.classList.add('controller__line');

  const controllerTitle = document.createElement('h1');
  controllerTitle.classList.add('controller__title');
  controllerTitle.textContent = name;
  controllerLine.appendChild(controllerTitle);
  root.appendChild(controllerLine);

  const controllerLine2 = document.createElement('div');
  controllerLine2.classList.add('controller__line');

  const controllerState = document.createElement('p');
  controllerState.classList.add('controller__state');
  controllerState.textContent = state;
  controllerLine2.appendChild(controllerState);
  root.appendChild(controllerLine2);

  return root
}

function renderMenu(items) {
  const list = document.createElement('ul');
  list.classList.add('element-list', 'controller__places-list');

  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('button', 'element-list__item', 'element-list__places-panel');
    index === 0 ?  li.classList.add('button--active') : null;
    li.textContent = item;
    list.appendChild(li);
  })

  return list
}

function renderModal(name, state, typeDevice) {
  const modal = document.createElement('div');

  const blockApplyBtn = document.createElement('div');
  blockApplyBtn.classList.add('modal__block');
  const blockCloseBtn = document.createElement('div');
  blockCloseBtn.classList.add('modal__block');

  const applyBtn = document.createElement('button');
  applyBtn.classList.add('button', 'button--active', 'modal__btn', 'modal__btn--active');
  applyBtn.textContent = 'Применить';
  applyBtn.setAttribute('id', 'applyBtn');
  blockApplyBtn.appendChild(applyBtn);

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('button', 'modal__btn');
  closeBtn.textContent = 'Закрыть';
  closeBtn.setAttribute('id', 'closeBtn');
  blockCloseBtn.appendChild(closeBtn);
  
  const content = renderContent(name, state, typeDevice);

  modal.appendChild(content);
  modal.appendChild(blockApplyBtn);
  modal.appendChild(blockCloseBtn);

  addButtonsListner(applyBtn, closeBtn);

  return modal;
}

function addButtonsListner(applyBtn, closeBtn) {
  applyBtn.addEventListener("click", () => {
    toggleModal();
  })

  closeBtn.addEventListener("click", () => {
    toggleModal();
  })
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

addFilterListner(filterNav, featuredNavToggle);

function addFilterListner(element, toggleButton) {
  element.addEventListener("click", event => {
    let target = event.target;
    event.preventDefault();
    
    while (target != element) {
      const filterPlace = target.getAttribute('data-filter-place');
      const filterType = target.getAttribute('data-filter-type');
      const filter = filterPlace !== null ? filterPlace : filterType;

      if (filter) {
        const textButton = target.firstChild.firstChild.cloneNode(false);
        toggleButton.replaceChild(textButton, toggleButton.firstChild);

        // захардкожены активные ссылки
        const navList = document.querySelector('.featured-nav__list');console.log(navList)
        for (let index = 0; index < navList.childNodes.length; index++) {
          const element = navList.childNodes[index];
          if (element.nodeType != 1) continue;
          
          element.classList.remove('featured-nav__item--active');
        }
        target.classList.add('featured-nav__item--active');

        // Закрывем меню
        featuredNav.classList.add("featured-nav--closed");
        featuredNav.classList.remove("featured-nav--opened");

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

// addControllerListner();

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