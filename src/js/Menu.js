export default function Menu({ nav, classNameNav }) {
  this.nav = nav;
  this.classNameNav = classNameNav;
  
  this.nav.addEventListener('click', () => {
    this.toggle();
  });
}

Menu.prototype.toggle = function() {
  if (this.nav.classList.contains(this.classNameNav + '--opened')) {
    this.close();
  } else {
    this.open();
  }
};

Menu.prototype.open = function() {
  this.nav.classList.remove(this.classNameNav + '--closed');
  this.nav.classList.add(this.classNameNav + '--opened');
};

Menu.prototype.close = function() {
  this.nav.classList.add(this.classNameNav + '--closed');
  this.nav.classList.remove(this.classNameNav + '--opened');
};
