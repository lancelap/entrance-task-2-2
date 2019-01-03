import addControllerListener from './addControllerListener';
import addTermometrListеner from './addTermometrListеner';

export default function modal() {
  const SUN = 'sun';
  const TEMP = 'temperature';
  const FLOOR = 'floor';

  const rootModal = document.querySelector('.modal');
  const lists = document.querySelectorAll('.elementnav__list');
  const pageContent = document.querySelector('.page__content');

  lists.forEach(element => {
    element.addEventListener('click', event => {
      let target = event.target;

      while (target != element) {
        const type = target.getAttribute('data-type');

        if (type === 'device') {
          const name = target.getAttribute('data-name');
          const state = target.getAttribute('data-state');
          const typeDevice = target.getAttribute('data-type-device');
          toggleModal(name, state, typeDevice, target);
          return;
        }

        target = target.parentNode;
      }
    });
  });

  document.getElementById('modal-accept').addEventListener('click', () => {
    toggleModal();
  });

  document.getElementById('modal-close').addEventListener('click', () => {
    toggleModal();
  });

  function toggleModal(title, state, typeDevice, target) {
    if (rootModal.classList.contains('modal--opened')) {
      document.body.classList.remove('page--no-scroll');
      rootModal.classList.remove('modal--opened');

      setTimeout(function() {
        rootModal.classList.add('modal--closed');
        pageContent.classList.remove('page__content--blured');
      }, 350);
    } else {
      const modalContent = document.getElementById('modal-content');
      const rect = target.getBoundingClientRect();
      modalContent.style.left = rect.x + 'px';
      modalContent.style.top = rect.y + 'px';

      document.body.classList.add('page--no-scroll');
      pageContent.classList.add('page__content--blured');
      rootModal.classList.remove('modal--closed');
      document.getElementById('controller__title').textContent = title;
      document.getElementById('controller__state').textContent = state;

      toggleSlider(typeDevice);

      setTimeout(function() {
        rootModal.classList.add('modal--opened');
      }, 10);
    }
  }

  function toggleSlider(typeDevice) {
    const controller = document.getElementById('controller');
    const icon = document.getElementById('weather-info-icon');
    const temp = document.getElementById('weather-info-temperature');

    controller.classList.remove('controller--' + FLOOR);
    controller.classList.remove('controller--' + SUN);
    controller.classList.remove('controller--' + TEMP);

    switch (typeDevice) {
    case SUN:
      controller.classList.add('controller--' + SUN);
      temp.style.display = 'none';
      icon.classList.add('weather__icon--sun');
      break;

    case TEMP:
      controller.classList.add('controller--' + TEMP);
      temp.style.display = 'block';
      icon.classList.remove('weather__icon--sun');
      icon.classList.add('weather__icon--temperature2');  
      break;

    case FLOOR:
      controller.classList.add('controller--' + FLOOR);
      temp.style.display = 'block';
      icon.classList.remove('weather__icon--sun');
      icon.classList.add('weather__icon--temperature2');
      break;

    default:
      break;
    }
  }
  // function renderContent(name, state, typeDevice) {
  //   const block = document.createElement('div');
  //   block.classList.add('controller', 'modal__line');

  //   const head = renderHead(name, state, typeDevice);

  //   block.appendChild(head);

  //   return block;
  // }

  // function renderController(typeDevice) {
  //   const root = document.createElement('div');

  //   if (typeDevice === SUN || typeDevice === TEMP) {
  //     root.classList.add('device-bar');
  //     typeDevice === TEMP
  //       ? root.classList.add('device-bar--temp')
  //       : root.classList.add('device-bar--light');
  //     root.classList.add('device-bar', 'controller__bar');

  //     const track = document.createElement('div');
  //     track.classList.add('device-bar__track');
  //     track.setAttribute('style', 'top: 105px');
  //     root.appendChild(track);

  //     addControllerListener(root, track);
  //   } else {
  //     root.classList.add('termometr', 'controller__termometr');
  //     const scale = document.createElement('div');
  //     scale.classList.add('termometr__scale');
  //     scale.classList.add('termometr__scale');

  //     const NS = 'http://www.w3.org/2000/svg';
  //     const svg = document.createElementNS(NS, 'svg');
  //     const circle = document.createElementNS(NS, 'circle');
  //     const title = document.createElementNS(NS, 'title');
  //     circle.setAttribute('r', 16);
  //     circle.setAttribute('cx', 16);
  //     circle.setAttribute('cy', 16);
  //     circle.classList.add('termometr__circle');
  //     svg.setAttribute('viewBox', '0 0 32 32');
  //     svg.classList.add('termometr__svg');
  //     title.textContent = 'circle';
  //     svg.appendChild(title);
  //     svg.appendChild(circle);
  //     scale.appendChild(svg);

  //     const bg = document.createElement('div');
  //     bg.classList.add('termometr__bg');

  //     const value = document.createElement('b');
  //     value.classList.add('termometr__value');
  //     value.textContent = '+23';

  //     const arrow = document.createElement('div');
  //     arrow.classList.add('termometr__arrow');
  //     arrow.setAttribute('style', 'transform: rotate(104deg)');

  //     root.appendChild(scale);
  //     root.appendChild(bg);
  //     root.appendChild(value);
  //     root.appendChild(arrow);

  //     addTermometrListеner(root, arrow);
  //   }

  //   return root;
  // }

  // function renderHead(name, state, typeDevice) {
  //   const root = document.createElement('div');

  //   const controllerLine = document.createElement('div');
  //   controllerLine.classList.add('controller__line', 'controller__temp-info');

  //   const controllerTitle = document.createElement('h1');
  //   controllerTitle.classList.add('controller__title');
  //   controllerTitle.textContent = name;
  //   controllerLine.appendChild(controllerTitle);

  //   const weather = document.createElement('div');
  //   weather.classList.add(
  //     'weather',
  //     'controller__weather',
  //     'controller__only-desktop'
  //   );

  //   const weatherInfo = document.createElement('p');
  //   weatherInfo.classList.add(
  //     'weather__info',
  //     'weather__info--with-icon',
  //     'controller__weather-info'
  //   );
  //   weather.appendChild(weatherInfo);

  //   const weatherIcon = document.createElement('span');
  //   weatherIcon.classList.add('weather__icon', 'controller__weather-icon');
  //   weather.appendChild(weatherIcon);

  //   if (typeDevice === SUN) {
  //     weatherIcon.classList.add('weather__icon--sun');
  //   } else {
  //     const content = document.createTextNode('+23');
  //     weatherInfo.appendChild(content);
  //     weatherIcon.classList.add('weather__icon--temperature2');
  //   }
  //   controllerLine.appendChild(weather);

  //   const controllerState = document.createElement('p');
  //   controllerState.classList.add('controller__state');
  //   controllerState.textContent = state;
  //   controllerLine.appendChild(controllerState);

  //   root.appendChild(controllerLine);

  //   const controller = renderController(typeDevice);

  //   if (typeDevice === SUN) {
  //     root.appendChild(
  //       renderMenu(
  //         [
  //           ['Вручную', null],
  //           ['Дневной свет', 0],
  //           ['Вечерний свет', 1],
  //           ['Рассвет', 0.5]
  //         ],
  //         controller
  //       )
  //     );
  //   } else if (typeDevice === TEMP) {
  //     root.appendChild(
  //       renderMenu(
  //         [['Вручную', null], ['Холодно', 0], ['Тепло', 0.5], ['Жарко', 1]],
  //         controller
  //       )
  //     );
  //   }

  //   root.appendChild(controller);

  //   return root;
  // }

  // function renderMenu(items, controller) {
  //   const list = document.createElement('ul');
  //   list.classList.add('elementnav__list', 'controller__places-list');

  //   items.forEach((item, index) => {
  //     const li = document.createElement('li');
  //     li.classList.add('elementnav__item', 'elementnav__item--controller', 'controller__places-item');
  //     const button = document.createElement('button');
  //     button.classList.add('button');

  //     index === 0 ? button.classList.add('button--active') : null;
  //     index === items.length - 1
  //       ? button.classList.add('controller__only-desktop')
  //       : null;
  //     button.textContent = item[0];
  //     button.setAttribute('data-value', item[1]);

  //     li.appendChild(button);
  //     list.appendChild(li);
  //   });

  //   list.addEventListener('click', e => {
  //     let target = e.target;

  //     while (target !== this) {
  //       if (target.tagName === 'BUTTON') {
  //         const track = controller.querySelector('.device-bar__track');

  //         let newTop =
  //           controller.clientHeight -
  //           controller.clientHeight * +target.dataset.value -
  //           track.offsetHeight / 2;
  //         let newLeft =
  //           controller.clientWidth * +target.dataset.value -
  //           track.offsetWidth / 2;
  //         if (newTop < 0) {
  //           newTop = 0;
  //         }
  //         if (newLeft < 0) {
  //           newLeft = 0;
  //         }

  //         let bottomEdge = controller.offsetHeight - track.offsetHeight;
  //         let rightEdge = controller.offsetWidth - track.offsetWidth;

  //         if (newTop > bottomEdge) {
  //           newTop = bottomEdge;
  //         }
  //         if (newLeft > rightEdge) {
  //           newLeft = rightEdge;
  //         }
  //         track.style.top = newTop + 'px';
  //         track.style.left = newLeft + 'px';

  //         const buttonActive = document.querySelector(
  //           '.controller__places-item > .button--active'
  //         );

  //         buttonActive.classList.remove('button--active');
  //         target.classList.add('button--active');
  //         return;
  //       }
  //       target = target.parentNode;
  //     }
  //   });

  //   const elementnav = document.createElement('div');
  //   elementnav.classList.add('elementnav', 'controller__elementnav');
  //   const wrapper = document.createElement('div');
  //   wrapper.classList.add('elementnav__wrapper');

  //   wrapper.appendChild(list);
  //   elementnav.appendChild(wrapper);

  //   return elementnav;
  // }

  // function renderModal(name, state, typeDevice, event) {

  //   var rect = event.target.getBoundingClientRect();
  //   // popup.style.left = e.x + 'px';
  //   // popup.style.top = e.y + 'px';

  //   const modal = document.createElement('section');
  //   modal.classList.add('modal__content');

  //   // if (typeDevice === TEMP || typeDevice === SUN) {
  //   //   modal.classList.add('modal__content--switch');
  //   // } else {
  //   //   modal.classList.add('modal__content--termometr');
  //   // }

  //   const blockBtn = document.createElement('div');
  //   blockBtn.classList.add('modal__block-btn');

  //   const applyBtn = document.createElement('button');
  //   applyBtn.classList.add(
  //     'button',
  //     'button--active',
  //     'modal__btn',
  //     'modal__btn--active'
  //   );
  //   applyBtn.textContent = 'Применить';
  //   applyBtn.setAttribute('id', 'applyBtn');
  //   blockBtn.appendChild(applyBtn);

  //   const closeBtn = document.createElement('button');
  //   closeBtn.classList.add('button', 'modal__btn');
  //   closeBtn.textContent = 'Закрыть';
  //   closeBtn.setAttribute('id', 'closeBtn');
  //   blockBtn.appendChild(closeBtn);

  //   const content = renderContent(name, state, typeDevice);

  //   modal.appendChild(content);
  //   modal.appendChild(blockBtn);

  //   applyBtn.addEventListener('click', () => {
  //     toggleModal();
  //   });
  //   closeBtn.addEventListener('click', () => {
  //     toggleModal();
  //   });

  //   return modal;
  // }
}
