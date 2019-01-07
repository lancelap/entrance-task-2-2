import Switch from './Switch';
import SelectMenu from './SelectMenu';

export default function FeaturedNav({obj, toggleElement, classNameNav }) {
  this.switch = new Switch({
    obj,
    toggleElement,
    classNameNav
  });

  this.obj = obj;
  this.toggleElement = toggleElement;
  this.classNameNav = classNameNav;

  this.obj.addEventListener('click', event => {
    this.select(event);
  });
}

FeaturedNav.prototype = Object.create(SelectMenu.prototype);
FeaturedNav.prototype.constructor = FeaturedNav;

FeaturedNav.prototype.select = function(event) {
  SelectMenu.prototype.select.apply(this, [event]);

  const targetButton = event.target.closest('li > button');
  if (targetButton) {
    event.preventDefault();
    this.toggleElement.innerHTML = targetButton.innerHTML;
    this.switch.toggle();
  }
};
