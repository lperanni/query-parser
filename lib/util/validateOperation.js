module.exports = validateOperation;

function validateOperation(op) {
	return supportedOperations.includes(op);
}

const supportedOperations = [
	'ts',
	'eq',
	'ne',
	'lt',
	'in',
	'lte',
	'gt',
	'gte',
	'between',
	'like',
	'notLike',
	'iLike',
	'notILike',
	'is',
	'not',
	'or',
	'notBetween',
	'startsWith',
	'endsWith',
	'substring',
	'regexp',
	'notRegexp',
	'iRegexp',
	'notIRegexp'
];


