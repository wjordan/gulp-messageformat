var MessageFormat = require('messageformat');
var	EOL = require('os').EOL;

// global, locale, namespace, prepend, append, file
module.exports = function(string, options) {
  options = options || {};

  if (!options.locale) {
    console.log('Error: Options `locale` is required.');
    return null;
  }

  options.namespace = options.namespace || 'i18n';
  options.global = options.global || 'this';

  var locale = options.locale,
    namespace = options.namespace;

  if (string == null) {
    return null;
  }

  try {
    var mf = new MessageFormat(locale, false, namespace);
  } catch (e) {
    //console.log('MF error: locale = ' + locale);
    return '';
  }

  try {
    return [
      options.prepend,
      '(function(g){',
      'var ' + namespace + ' = ' + mf.functions() + ';',
      (namespace + '["' + namespace + '"] = ' + mf.precompileObject(JSON.parse(string)) + ';'),
      'return g["' + namespace + '"] = ' + namespace + ';',
      '})(' + options.global + ');',
      options.append
    ].join(EOL);
  } catch (errs) {
    var message = '';
    if (errs.join) {
      message = errs.join('\n');
    } else {
      message = errs.name + ': ' +  errs.message
    }
    console.log('Error:' + message);
    return null;
  }
};
