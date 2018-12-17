import getCoords from './utils/getCoords';

export default function addTermometrListener(termometr, termometrArrow) {
  termometr.addEventListener('click', e => {
    const terCoord = getCoords(termometr);
    const x = (e.pageX - terCoord.left - termometr.offsetWidth / 2) / 110.5;
    const y =
      ((e.pageY - terCoord.top - termometr.offsetHeight / 2) * -1) / 110.5;

    let angle = (Math.atan2(y, x) * 180) / Math.PI;
    angle <= 0 ? (angle += 360) : (angle = angle);

    termometrArrow.setAttribute(
      'style',
      `transform: rotate(${-(angle - 90)}deg)`
    );
  });
}
