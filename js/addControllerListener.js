import getCoords from './utils/getCoords';

export default function addControllerListener(deviceBar, deviceTrack) {
  deviceBar.addEventListener('mousedown', e => {
    var barCoords = getCoords(deviceBar);

    let newTop = e.pageY - barCoords.top - deviceTrack.offsetHeight / 2;
    let newLeft = e.pageX - barCoords.left - deviceTrack.offsetWidth / 2;
    if (newTop < 0) {
      newTop = 0;
    }
    if (newLeft < 0) {
      newLeft = 0;
    }

    let bottomEdge = deviceBar.offsetHeight - deviceTrack.offsetHeight;
    let rightEdge = deviceBar.offsetWidth - deviceTrack.offsetWidth;
    if (newTop > bottomEdge) {
      newTop = bottomEdge;
    }
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }
    deviceTrack.style.top = newTop + 'px';
    deviceTrack.style.left = newLeft + 'px';
  });
}
