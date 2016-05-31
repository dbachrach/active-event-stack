import uniqueId from 'lodash.uniqueid';

const uniqueEventId = uniqueId.bind(null, 'active_event_');

if (typeof document != 'undefined') {
  document.addEventListener('click', onEvent.bind(null, 'click'), true);
  document.addEventListener('keydown', onEvent.bind(null, 'keydown'));
  document.addEventListener('keyup', onEvent.bind(null, 'keyup'));
}

const listenables = [];

function onEvent(type, event) {
  const listenable = listenables[listenables.length - 1]; // Get the last listenable
  if (listenable) {
    let handler = listenable.get(type);
    if (typeof handler == 'function') {
      handler(event);
    }
  }
};

const EventStack = {
  addListenable(listenArray) {
    /* ex: [['click', clickHandler], ['keydown', keydownHandler]] */
    const id = uniqueEventId();
    const listenable = new Map(listenArray);
    listenables.push({ id, listenable });
    return id;
  },
  removeListenable(id) {
    const index = listenables.findIndex(el => el.id === id);
    listenables.splice(index, 1);
  }
};

export default EventStack;