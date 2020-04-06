var arsenal = (function() {
  var debug = 1;

  var isSurge = !typeof $surge === 'undefined';
  var isQuanX = !isSurge;

  var noop = function() {};
  var emptyObj = {};
  var emptyStr = '';

  return {
      // common
      finish: $done,
      setTimeout: setTimeout,
      logger: function() {
          debug && console.log(arguments[0]);
      },
      setLoggerEnable: function(toggle = true) {
          debug = +toggle;
      },
      fetch: function(options, callback) {
          if (isSurge) {
              // $httpClient.get, $httpClient.put，$httpClient.delete, $httpClient.head, $httpClient.options, $httpClient.patch
              var requestMapping = {
                  get: $httpClient.get,
                  put: $httpClient.put,
                  delete: $httpClient.delete,
                  head: $httpClient.head,
                  options: $httpClient.options,
                  patch: $httpClient.patch
              };

              var method = (options.method ? options.method : 'GET').toLocaleLowerCase();

              var reqeuest = requestMapping[method];

              if (!request) {
                  callback &&
                      callback({
                          error: 'illegal request method ' + method
                      });
                  return;
              }

              reqeuest(options, function(error, response, data) {
                  // When success, the error is Null, and the response contains 'status' and 'headers'.
                  callback &&
                      callback({
                          error: error,
                          status: response.status,
                          headers: response.headers,
                          data: data
                      });
              });
          }
          if (isQuanX) {
              $task.fetch(options).then(
                  function(response) {
                      // response.statusCode, response.headers, response.body
                      callback &&
                          callback({
                              error: null,
                              status: response.statusCode,
                              headers: response.headers,
                              data: response.body
                          });
                  },
                  function(reason) {
                      // reason.error
                      callback &&
                          callback({
                              error: reason.error,
                              status: null,
                              headers: null,
                              data: null
                          });
                  }
              );
          }
      },
      localStroage: {
          getItem: function(key) {
              if (isSurge) {
                  return $persistentStore.read(key);
              }
              if (isQuanX) {
                  return $prefs.valueForKey(key);
              }
          },
          setItem: function(key, value) {
              if (isSurge) {
                  return $persistentStore.write(value, key);
              }
              if (isQuanX) {
                  return $prefs.setValueForKey(value, key);
              }
          },
          removeItem: function(key) {
              if (isQuanX) {
                  return $prefs.removeValueForKey(key);
              }
          },
          clear: function() {
              if (isQuanX) {
                  return $prefs.removeAllValues();
              }
          }
      },
      postNotification: function(title = '', subtitle = '', message = '') {
          if (isSurge) {
              $notification.post(title, subtitle, message);
          }
          if (isQuanX) {
              $notify(title, subtitle, message);
          }
      },
      // QuanX
      $nativeURLRequest: function() {
          if (isSurge) {
              return noop;
          }
          if (isQuanX) {
              return $nativeURLRequest;
          }
      },
      // Surge
      $utils: function() {
          if (isSurge) {
              return $utils;
          }
          if (isQuanX) {
              return emptyObj;
          }
      },
      $surge: function() {
          if (isSurge) {
              return $surge;
          }
          if (isQuanX) {
              return emptyObj;
          }
      },
      $script: function() {
          if (isSurge) {
              return $script;
          }
          if (isQuanX) {
              return emptyObj;
          }
      },
      $network: function() {
          if (isSurge) {
              return $network;
          }
          if (isQuanX) {
              return emptyObj;
          }
      },
      $cronexp: function() {
          if (isSurge) {
              return $cronexp;
          }
          if (isQuanX) {
              return emptyStr;
          }
      }
  };
})();