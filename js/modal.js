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
}
