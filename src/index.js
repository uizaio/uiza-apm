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
      if (payload.context) { // issue here https://github.com/elastic/apm-agent-nodejs/issues/290
        if (payload.context.request.url.pathname.indexOf("health_check") === -1) {
          return payload;
        } else {
          if (config.logLevel) {
            apm.logger.debug("health check request is not be recorded ", payload.context.request.url.pathname);
          }
        }
      } else {
        return payload;
      }
    });
    return apm;
  }
}

export default new UizaApmAgent();