const validate = require('./validateOperation.js');

module.exports = parser;

function parser(query) {
	const operations = {};
	Object.entries(query)
		.forEach(([attribute, filter]) => {
			const [operation, value] = filter.split('.');
			if (validate(operation)) { 
				operations[attribute] = { [operation]: castArgType(value) }; 
				delete query[attribute];
			}	
		});
	query.operations = operations;
	return query;
}

// Here we check if the argument is an array or a boolean, as the Date constructor can handle a string but the Boolean constructor can't detect
// boolean values in quotations (ex. 'false').
function castArgType(arg) {
	if(arg === 'false') return false;
	if (arg === 'true') return true;
	if (arg.split(',').length > 1) return arg.split(',');
	return arg;
}
