var archive = require('../helpers/archive-helpers');


archive.readListOfUrls((urls) => {
  if (urls) {
    archive.downloadUrls(urls);
  }
});