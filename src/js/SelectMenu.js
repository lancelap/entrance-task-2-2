import Menu from './Menu';

export default function SelectMenu({ toggleButton }) {
  Menu.apply(this, arguments);
  this.toggleButton = toggleButton;

  this.nav.addEventListener('click', event => {
    this.select(event);
  });
}

SelectMenu.prototype = Object.create(Menu.prototype);
SelectMenu.prototype.constructor = SelectMenu;

SelectMenu.prototype.select = function(event) {
  const targetButton = event.target.closest('li > button');
  if (targetButton) {
    event.preventDefault();
    this.toggleButton.innerHTML = targetButton.innerHTML;

    // переключаем состояние кнопок
    const buttonActive = document.querySelector('li > .button--active');
    buttonActive.classList.remove('button--active');
    targetButton.classList.add('button--active');
  }
};
