const defaultOptions = [
  {
    id: 0,
    value: 'Weak',
    minDiversity: 1,
    minLength: 8,
  },
  {
    id: 1,
    value: 'Strong',
    minDiversity: 2,
    minLength: 8,
  },
  {
    id: 2,
    value: 'Very Strong',
    minDiversity: 4,
    minLength: 10,
  },
];

const escapeRegExp = (string) => string.replace(/[-.*+?^${}()|[\]\\]/g, '\\$&');

const passwordStrength = (password, options = defaultOptions, allowedSymbols = '!@#$%^&*') => {
  let passwordCopy = password || '';

  (options[0].minDiversity = 0), (options[0].minLength = 0);

  const rules = [
    {
      regex: '[a-z]',
      message: 'lowercase',
    },
    {
      regex: '[A-Z]',
      message: 'uppercase',
    },
    {
      regex: '[0-9]',
      message: 'number',
    },
  ];

  if (allowedSymbols) {
    rules.push({
      regex: `[${escapeRegExp(allowedSymbols)}]`,
      message: 'symbol',
    });
  }

  let strength = {};

  strength.contains = rules.filter((rule) => new RegExp(`${rule.regex}`).test(passwordCopy)).map((rule) => rule.message);

  strength.length = passwordCopy.length;

  let fulfilledOptions = options
    .filter((option) => strength.contains.length >= option.minDiversity)
    .filter((option) => strength.length >= option.minLength)
    .sort((o1, o2) => o2.id - o1.id)
    .map((option) => ({ id: option.id, value: option.value }));

  Object.assign(strength, fulfilledOptions[0]);

  return strength.value;
};

module.exports = { passwordStrength, defaultOptions };
