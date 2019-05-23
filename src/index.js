import apm from 'elastic-apm-node';

class UizaApmAgent {
  constructor() {
    this.apm = apm;
  }

  start(config) {
    if (!apm.isStarted()) {
      apm.start(config);
    }
    apm.addFilter(function (payload) {
      if (payload.context.request.url.pathname.indexOf("health_check") === -1) {
        return payload;
      }
    });
    return apm;
  }
}

export default new UizaApmAgent();