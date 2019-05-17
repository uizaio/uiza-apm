import apm from 'elastic-apm-node';

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

export default new UizaApmAgent();