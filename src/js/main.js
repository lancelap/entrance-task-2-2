import Menu from './Menu';
import SelectMenu from './SelectMenu';
import modal from './modal';
import Gallery from './Gallery';
import Filter from './Filter';
import featuredScripts from './featuredScripts';
import addControllerListener from './addControllerListener';
import addTermometrListеner from './addTermometrListеner';

const mainNav = document.getElementById('main-nav');
const mainMenu = new Menu({ nav: mainNav, classNameNav: 'nav' });

const featuredNav = document.getElementById('featured-nav');
const featuredNavToggle = document.getElementById('devices__toggle');
const secondaryMenu = new SelectMenu({
  nav: featuredNav,
  toggleButton: featuredNavToggle,
  classNameNav: 'featured-nav'
});

const deviceBar = document.querySelector('.device-bar');
const deviceTrack = document.querySelector('.device-bar__track');
const termometr = document.querySelector('.controller__termometr');
const termometrArrow = document.querySelector('.termometr__arrow');
if (deviceBar) {
  addControllerListener(deviceBar, deviceTrack);
}
if (termometr) {
  addTermometrListеner(termometr, termometrArrow);
}

const filterNav = document.getElementById('featured-nav-list');
const devicesList = document.getElementById('devices');
const filter = new Filter({ element: filterNav, list: devicesList });

const scripts = document.querySelector('.scripts__slider');
const navScripts = document.getElementById('nav-featured-scripts');
const scriptsGallery = new Gallery({
  list: scripts,
  controls: navScripts,
  width: 685
});

const devicess = document.getElementById('devices');
const navDevices = document.getElementById('nav-featured-devices');
const devicessGallery = new Gallery({
  list: devicess,
  controls: navDevices,
  width: 460  
});

modal();
featuredScripts();
