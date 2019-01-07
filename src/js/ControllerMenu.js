import SelectMenu from './SelectMenu';

export default function ControllerMenu(menu) {
  const obj = menu.querySelector('.controller__places-list');
  SelectMenu.call(this, { obj });
  this.isCustomValue = true;
  this.input = menu.querySelector('.input-range__slider');

  this.input.addEventListener('input', () => {
    if (this.isCustomValue !== true ) {
      this.input.disabled = true;
    }    
  });
}

ControllerMenu.prototype = Object.create(SelectMenu.prototype);
ControllerMenu.prototype.constructor = ControllerMenu;

ControllerMenu.prototype.select = function(event) {
  SelectMenu.prototype.select.apply(this, [event]);

  const targetButton = event.target.closest('li > button');
  if (targetButton) {
    const event = new Event('input', {bubbles: true, cancelable: false});
    this.isCustomValue = targetButton.dataset.value === 'custom' ? true : false;
    this.input.removeAttribute('disabled');
    
    this.input.value = targetButton.dataset.value;
    this.input.dispatchEvent(event);
  }
};
