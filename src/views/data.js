var SCRIPT = 'script';
var LIGHT = 'light';
var FLOOR = 'floor';
var TIME = 'time';

var KITCHEN = 'kitchen';
var HALL = 'hall';

var arrDevices = [ { name: 'Xiaomi Yeelight LED Smart Bulb', isActive: true, state: 'Включено', typeIcon: SUN, type: DEVICE, place: KITCHEN }, { name: 'D-Link Omna 180 Cam', isActive: false, state: 'Включится в 17:00', typeIcon: SUN, type: DEVICE, place: HALL }, { name: 'Elgato Eve Degree Connected', isActive: false, state: 'Выключено до 17:00', typeIcon: TEMP, type: DEVICE, place: KITCHEN }, { name: 'LIFX Mini Day & Dusk A60 E27', isActive: false, state: 'Включится в 17:00', typeIcon: SUN, type: DEVICE, place: HALL }, { name: 'Xiaomi Mi Air Purifier 2S', isActive: true, state: 'Включено', typeIcon: SUN, type: DEVICE, place: KITCHEN }, { name: 'Philips Zhirui', isActive: false, state: 'Выключено', typeIcon: SUN, type: DEVICE, place: HALL }, { name: 'Xiaomi Mi Air Purifier 2S', isActive: true, state: 'Включено', typeIcon: SUN, type: DEVICE, place: KITCHEN }, { name: 'Xiaomi Warm Floor', isActive: false, state: 'Выключено', typeIcon: FLOOR, type: DEVICE, place: HALL } ];

var arrNextScripts = [
  {
    name: 'Philips Cooler',
    isActive: false,
    schedule: 'Начнет охлаждать в 16:30',
    typeIcon: TEMP,
    type: DEVICE
  },
  {
    name: 'Xiaomi Yeelight LED Smart Bulb',
    isActive: false,
    schedule: 'Включится в 17:00',
    typeIcon: LIGHT,
    type: DEVICE
  },
  {
    name: 'Xiaomi Mi Air Purifier 2S',
    isActive: true,
    schedule: 'Включено',
    typeIcon: LIGHT,
    type: DEVICE
  }
];
