var path = require('path');
var archive = require('../helpers/archive-helpers');
//var helpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!



var actions = {
  'GET': function (request, response) {
    fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function (error, data) {
      console.log('DATA HERE: ', data);
      console.log('TYPE DATA HERE: ', typeof data);
      response.writeHead(200);
      response.end(data);
    });
  }

  /*function(request, response) {
    helpers.serveAssets(response, request, function (data, statusCode) {
      console.log('Data: '+ data);
      console.log('Status Code: ' + statusCode);
      helpers.sendResponse(response, data, statusCode)
    });*/
  //}

  // 'POST': function(request, response) {
  //   helpers.collectData(request, function(data) {
  //     archive.isUrlInList(data, function (status) {
  //       if (status === false) {
  //         archive.addUrlToList(data, function () {});
  //       } else {
  //         fs.readFile('./public/loading.html', function(error, html) {
  //           helpers.sendResponse(response, html, statusCode = 302);
  //         });
  //       }
  //     });
  //   });
  // }

}


exports.handleRequest = function (req, res) {
  actions[req.method](req, res);
  res.end(archive.paths.list);
};





