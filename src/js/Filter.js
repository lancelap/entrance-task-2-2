export default function Filter(options) {
  const { element, list } = options;

  element.addEventListener('click', event => {
    filter(event);
  });

  function filter(event) {
    let target = event.target;
    event.preventDefault();

    while (target != element) {
      const filterPlace = target.getAttribute('data-filter-place');
      const filterType = target.getAttribute('data-filter-type');
      const filter = filterPlace !== null ? filterPlace : filterType;

      if (filter) {
        for (let index = 0; index < list.childNodes.length; index++) {
          const element = list.childNodes[index];
          if (element.nodeType != 1) continue;

          const placeDevice = element.getAttribute('data-place');
          const typeDevice = element.getAttribute('data-type-device');
          element.style = 'display:none';

          if (
            placeDevice === filter ||
            typeDevice === filter ||
            filter === 'none'
          ) {
            element.style = '';
          }
        }
        return;
      }
      target = target.parentNode;
    }
  }
}
