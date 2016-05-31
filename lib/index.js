'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashUniqueid = require('lodash.uniqueid');

var _lodashUniqueid2 = _interopRequireDefault(_lodashUniqueid);

var uniqueEventId = _lodashUniqueid2['default'].bind(null, 'active_event_');

if (typeof document != 'undefined') {
  document.addEventListener('click', onEvent.bind(null, 'click'), true);
  document.addEventListener('keydown', onEvent.bind(null, 'keydown'));
  document.addEventListener('keyup', onEvent.bind(null, 'keyup'));
}

var listenables = [];

function onEvent(type, event) {
  var listenable = listenables[listenables.length - 1]; // Get the last listenable
  if (listenable) {
    var handler = listenable.get(type);
    if (typeof handler == 'function') {
      handler(event);
    }
  }
};

var EventStack = {
  addListenable: function addListenable(listenArray) {
    /* ex: [['click', clickHandler], ['keydown', keydownHandler]] */
    var id = uniqueEventId();
    var listenable = new Map(listenArray);
    listenables.push({ id: id, listenable: listenable });
    return id;
  },
  removeListenable: function removeListenable(id) {
    var index = listenables.findIndex(function (el) {
      return el.id === id;
    });
    listenables.splice(index, 1);
  }
};

exports['default'] = EventStack;
module.exports = exports['default'];