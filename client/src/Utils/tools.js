import Fingerprint2 from "fingerprintjs2";

export default {
  fingerprint: function(callback = function() {}, options = {}) {
    if (window.requestIdleCallback) {
      requestIdleCallback(function() {
        Fingerprint2.getV18(options, function(result, components) {
          callback(result);
        });
      });
    } else {
      setTimeout(function() {
        Fingerprint2.getV18(options, function(result, components) {
          callback(result);
        });
      }, 500);
    }
  }
};
