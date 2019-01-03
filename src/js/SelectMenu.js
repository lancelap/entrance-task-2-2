import Switch from './Switch';

export default function SelectMenu({ toggleElement }) {
  Switch.apply(this, arguments);
  this.toggleElement = toggleElement;

  this.obj.addEventListener('click', event => {
    this.select(event);
  });
}

SelectMenu.prototype = Object.create(Switch.prototype);
SelectMenu.prototype.constructor = SelectMenu;

SelectMenu.prototype.select = function(event) {
  const targetButton = event.target.closest('li > button');
  if (targetButton) {
    event.preventDefault();
    this.toggleElement.innerHTML = targetButton.innerHTML;

    // переключаем состояние кнопок
    const buttonActive = document.querySelector('li > .button--active');
    buttonActive.classList.remove('button--active');
    targetButton.classList.add('button--active');

    this.toggle();
  }
};
