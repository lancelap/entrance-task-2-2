import Menu from './Menu';
import SelectMenu from './SelectMenu';
import modal from './modal';
import Gallery from './Gallery';
import Filter from './Filter';
import featuredScripts from './featuredScripts';
import addControllerListener from './addControllerListener';
import addTermometrListеner from './addTermometrListеner';

const mainNav = document.getElementById('main-nav');
const mainNavToggle = document.getElementById('main-nav-toggle');
new Menu({
  nav: mainNav,
  toggleButton: mainNavToggle,
  classNameNav: 'header__nav'
});

const featuredNav = document.getElementById('featured-nav');
const featuredNavToggle = document.getElementById('devices__toggle');
new SelectMenu({
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

const scripts = document.getElementById('scripts');
const navScripts = document.getElementById('nav-featured-scripts');
new Gallery({
  list: scripts,
  controls: navScripts
});

const devices = document.getElementById('devices');
const navDevices = document.getElementById('nav-featured-devices');
const devicesGallery = new Gallery({
  list: devices,
  controls: navDevices
});

const filterNav = document.getElementById('featured-nav-list');
const devicesList = document.getElementById('devices');
new Filter({ element: filterNav, list: devicesList, gallery: devicesGallery });

modal();
featuredScripts();
