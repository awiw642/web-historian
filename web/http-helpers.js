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



/*exports.serveAssets = function(res, asset, callback) {
  var statusCode = 200;
  console.log('PATH: ', archive.paths.siteAssets);
  fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8',  function(error, data) {
    if (error) {
      throw error;
    } else {
      //console.log('Data from serveAssets: ', data);
      callback(data, statusCode);
    }
  });
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  console.log('ASSET ------------->', asset.url);
};*/

exports.sendResponse = function(response, data, statusCode = 200) {
  console.log('Send Response Data: ', data);
  response.writeHead(statusCode, {'Content-Type': 'text/css'});
  response.end(data);
}

// exports.redirect = function()
//   resonse.writeHead(302, {
//     'Location': ''
//   });

exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(data.slice(4));
  });
}


// As you progress, keep thinking about what helper functions you can put here!
