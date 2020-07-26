const validate = require('./validateOperation.js');
const { cast } = require('./helper');

module.exports = parser;

function parser(query, mapper) {
	mapper = mapper || function (operation, value) { ({ [operation]: cast(value) });};
	const operations = {};
	Object.entries(query)
		.forEach(([attribute, filter]) => {
			if(!filter.includes('.')) return;
			const [operation, value] = filter.split('.');
			if (validate(operation)) { 
				operations[attribute] = mapper(operation, value); 
				delete query[attribute];
			}	
		});
	return { ...query, operations};
}