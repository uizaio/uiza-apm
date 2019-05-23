'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var apm = _interopDefault(require('elastic-apm-node'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var UizaApmAgent =
/*#__PURE__*/
function () {
  function UizaApmAgent() {
    _classCallCheck(this, UizaApmAgent);

    this.apm = apm;
  }

  _createClass(UizaApmAgent, [{
    key: "start",
    value: function start(config) {
      if (!apm.isStarted()) {
        apm.start(config);
      }

      apm.addFilter(function (payload) {
        if (payload.context.request.url.pathname.indexOf("health_check") === -1) {
          return payload;
        } else {
          if (config.logLevel) {
            apm.logger.debug("health check request will not be recorded ", payload.context.request.url.pathname);
          }
        }
      });
      return apm;
    }
  }]);

  return UizaApmAgent;
}();

var index = new UizaApmAgent();

module.exports = index;
