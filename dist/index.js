'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var apm = _interopDefault(require('elastic-apm-node'));

class UizaApmAgent {
  constructor() {
    this.apm = apm;
  }

  start(config) {
    if (!apm.isStarted()) {
      apm.start(config);
    }
    return apm;
  }
}

var index = new UizaApmAgent();

module.exports = index;
