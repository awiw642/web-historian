var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'), //Pages to show to the users
  archivedSites: path.join(__dirname, '../archives/sites'), // Archived the pages
  list: path.join(__dirname, '../archives/sites.txt') // List of all the requested pages/urls
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // Q: What happen when you read an empty file??
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
  fs.appendFile(exports.paths.list, url, function(error) {
    if (error) {
    } else {
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
