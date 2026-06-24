import { dom } from './dom';

function initMap() {
  const { mapStub, mapButton, liveMap } = dom;

  if (!mapStub || !mapButton || !liveMap) {
    return;
  }

  function activateMap() {
    if (mapStub) {
      mapStub.remove();
    }

    if (liveMap instanceof HTMLElement && liveMap) {
      liveMap.src = `${liveMap.dataset.src}`;
    }
  }

  mapButton.addEventListener('click', () => {
    activateMap();
  });
}
initMap();
