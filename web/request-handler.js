let path = require('path');
let archive = require('../helpers/archive-helpers');
let helpers = require('./http-helpers');
let url = require('url');

let actions = {

  'GET': (request, response) => {
    let urlPath = url.parse(request.url).pathname;

    if (urlPath === '/') {
      urlPath = '/index.html';
    }

    helpers.serveAssets(response, urlPath, () => {
      if (urlPath[0] === '/') {
        urlPath = urlPath.slice(1);
      }

      archive.isUrlInList(urlPath, (status) => {
        if (status) {
          helpers.sendRedirect(response, '/loading.html');
        } else {
          helpers.sendNotFound(response);
        }
      });
    });
  },

  'POST': (request, response) => {
    helpers.collectData(request, (data) => {
      archive.isUrlInList(data, (found) => {
        if (found === true) {
          archive.isUrlArchived(data, (archived) => {
            if (archived === true) {
              helpers.sendRedirect(response, '/' + data);
            } else {
              helpers.sendRedirect(response, '/loading.html');
            }
          });
        } else {
          archive.addUrlToList(data, () => {
            helpers.sendRedirect(response, '/loading.html');
          });
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) {
  var handler = actions[req.method];
  if (handler) {
    handler(req, res);
  }
};