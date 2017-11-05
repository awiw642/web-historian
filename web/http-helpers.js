var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};



exports.serveAssets = function(res, asset, callback) {
  console.log('Asset: ' + asset);
  fs.readFile(archive.paths.siteAssets + asset, 'utf8', function (error, data) {
    if (error) {
      fs.readFile(archive.paths.archivedSites + asset, 'utf8', function (error, data) {
        if (error) {
          callback();
        } else {
          exports.sendResponse(res, data);
        }
      });
    } else {
      exports.sendResponse(res, data);
    }
  });
};

exports.sendRedirect = function (response, location, statusCode = 302) {
  response.writeHead(statusCode, {Location: location});
  response.end();
};

exports.sendResponse = function(response, obj, statusCode = 200) {
  response.writeHead(statusCode, exports.headers);
  response.end(obj);
};


exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(data.slice(4).replace('http://', ''));
  });
};

exports.sendNotFound = function (response) {
  exports.sendResponse(response, '404: Not Found', 404);
};


// As you progress, keep thinking about what helper functions you can put here!
