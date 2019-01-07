import getCoords from './utils/getCoords';

export default function addTermometrListener(termometr, termometrArrow) {
  const max = 309.12;
  const min = 233.35;

  const r = 70; // радиус
  const d = r * 2 * Math.PI; // диаметр
  const len = d * 0.8; // максимальная длина линии

  const chart = document.getElementById('termometr-svg');

  function updateValue(val) {
    const l = (len * val) / 100;
    if (val < 5) {
      chart.style.strokeDasharray = l + ' ' + (d - Math.min(l, 353.58));
      return;
    }
    chart.style.strokeDasharray = l - 5 + ' ' + (d - Math.min(l, 353.58) + 5);
  }

  function updateCirecle(angle) {
    termometrArrow.setAttribute(
      'style',
      `transform: rotate(${-(angle - 90)}deg)`
    );
  }

  updateValue(0);
  updateCirecle(min);

  termometr.addEventListener('click', e => {
    const svg = document.querySelector('.termometr__scale > svg');
    const r = svg.getBoundingClientRect();
    const params = {
      x: r.x + r.width / 2,
      y: r.y + r.height / 2
    };

    if (params) {
      const dx = e.clientX - params.x;
      const dy = e.clientY - params.y;
      const a = Math.atan2(dy, dx);

      const val = ((a / Math.PI) * 180 - 120 + 360) % 360;
      const val2 = (val / 290) * 100;
      updateValue(val2);
    }

    const terCoord = getCoords(termometr);
    const w = termometr.offsetWidth;
    const h = termometr.offsetHeight;

    const x = (e.pageX - terCoord.left - w / 2) / w / 2;
    const y = ((e.pageY - terCoord.top - h / 2) * -1) / h / 2;
    let angle = (Math.atan2(y, x) * 180) / Math.PI;

    angle <= 0 ? (angle += 360) : (angle = angle);
    if (angle > min && angle < min) {
      angle = min;
    }

    if (angle > min && angle < max) {
      angle = max;
    }

    updateCirecle(angle);
  });
}
