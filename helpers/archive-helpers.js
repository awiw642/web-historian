var fs = require('fs');
var path = require('path');
var request = require('request');
var _ = require('underscore');

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function (error, data) {
    if (error) {
    }
    callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function (listOfUrls) {
    if (listOfUrls.indexOf(url) < 0) {
      callback(false);
    } else {
       callback(true);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function(error, file) {
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  let archivedSites = exports.paths.archivedSites + '/' + url;

  fs.access(archivedSites, (error) => {
    //error populated when there is an error
    // Able to access means archived sites exists
    callback(!error);
  });
};

exports.downloadUrls = function(urls) {
  urls.forEach((url) => {
    if (!url) {
      return;
    }
    return request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });

};
