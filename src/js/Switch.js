export default function Switch({ obj, toggleElement, classNameNav }) {
  this.obj = obj;
  this.toggleElement = toggleElement;
  this.classNameNav = classNameNav;
  
  this.toggleElement.addEventListener('click', () => {
    this.toggle();
  });
}

Switch.prototype.toggle = function() {
  this.obj.classList.toggle(this.classNameNav + '--opened');
};
