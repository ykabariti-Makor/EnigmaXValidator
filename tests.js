const { passwordValidation, setConfig } = require('./passwordValidation');

setConfig.characterLen = 12;
setConfig.upperCase = 4;

setConfig(12,0,3,0,'@')
console.log(passwordValidation('123456a78b90c-@'));
