'use strict';
var transform = require('transform-multicore');

module.exports = function(fileOptions) {
  return transform(require.resolve('./transform'), {
    input: function(data) {
      return {
        string: data.contents.toString(),
        options: fileOptions(data)
      }
    },
    output: function(origData, inputData, outputData) {
      origData.contents = new Buffer(outputData);
      return origData;
    }
  });
};
