const { passwordStrength } = require('./passwordStrength');

let config = {
  characterLen: 8,
  upperCase: 1,
  lowerCase: 1,
  num: 1,
  symbol: '#?!@$%^&*-',
};

const setConfig = (charLength, upperCase, lowerCase, num, symbol) => {
  config = {
    characterLen: charLength === null || charLength === undefined || charLength === 0 ? undefined : charLength,
    upperCase: upperCase === null || upperCase === undefined || upperCase === 0 ? undefined : upperCase,
    lowerCase: lowerCase === null || lowerCase === undefined || lowerCase === 0 ? undefined : lowerCase,
    num: num === null || num === undefined || num === 0 ? undefined : num,
    symbol: symbol === null || symbol === undefined || symbol === '' ? undefined : symbol,
   
  };
};

const passwordValidation = (password) => {
  let validation = [
    config.characterLen !== undefined && config.characterLen !== 0
      ? {
          title: 'Char',
          valid: false,
          re: new RegExp('^.{' + config.characterLen + ',}$'),
        }
      : null,
    config.upperCase !== undefined && config.upperCase !== 0
      ? {
          title: 'UpperCase',
          valid: false,
          re: new RegExp('^(.*?[A-Z]){' + config.upperCase + ',}'),
        }
      : null,
    config.lowerCase != undefined && config.lowerCase != 0
      ? {
          title: 'LowerCase',
          valid: false,
          re: new RegExp('^(.*?[a-z]){' + config.lowerCase + ',}'),
        }
      : null,
    config.num != undefined && config.num != 0
      ? {
          title: 'Number',
          valid: false,
          re: new RegExp('^(.*?[0-9]){' + config.num + ',}'),
        }
      : null,
    config.symbol !== undefined && config.symbol !== ''
      ? {
          title: 'NonAlphaNumeric',
          valid: false,
          re: new RegExp('^(.*?[' + config.symbol + ',])'),
        }
      : null,
  ];

  validation = validation.filter((validator) => validator !== null && validator !== undefined);
  let actualValidation = validation.map((validator) => {
    return { ...validator, valid: Boolean(validator.re.test(password)) };
  });
  validation = actualValidation;
  return {validation, strength : passwordStrength(password)};
};
module.exports = { passwordValidation, setConfig };
