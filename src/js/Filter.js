export default function Filter(options) {
  const { element, list, gallery } = options;

  element.addEventListener('click', event => {
    let target = event.target;
    event.preventDefault();

    const item = target.closest('li');
    if (!item) return;
    const filter = item.dataset.filterPlace || item.dataset.filterType;
    if (!filter) return;

    list.childNodes.forEach(child => {
      if (child.nodeType != 1) return;

      const placeDevice = child.dataset.place;
      const typeDevice = child.dataset.typeDevice;
      child.style = 'display:none';

      if (
        placeDevice === filter ||
        typeDevice === filter ||
        filter === 'none'
      ) {
        child.style = '';
      }
    });

    gallery.check();
  });
}
