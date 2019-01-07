export default function SelectMenu({obj}) {
  this.obj = obj;

  this.obj.addEventListener('click', event => {
    this.select(event);
  });
}

SelectMenu.prototype.select = function(event) {
  const targetButton = event.target.closest('li > button');
  if (targetButton) {
    event.preventDefault();
    // переключаем состояние кнопок
    const buttonActive = this.obj.querySelector('li > .button--active');
    buttonActive.classList.remove('button--active');
    targetButton.classList.add('button--active');
  }
};
