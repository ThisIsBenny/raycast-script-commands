const http = require('http');
const config = require('./config');

module.exports = {
  sendRequest: (url) => {
    return new Promise(function(resolve, reject) {
      return http.request({
        host: config.hostName,
        path: url
      }, (response) => {
        let str = '';
        response.on('error', function (e) {
          return reject();
        });
        response.on('data', function (chunk) {
          str += chunk;
        });
        response.on('end', function () {
          if (('' + response.statusCode).match(/^2\d\d$/)) {
            return resolve(JSON.parse(str))
          } else {
            return reject();
          }
        });
      }).end();
    });
  },
  defaultError: () => {
    console.log('⚠️ Request failed')
  },
  capitalizeFirstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}