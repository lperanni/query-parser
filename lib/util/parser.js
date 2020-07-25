const validate = require('./validateOperation.js');
const { cast } = require('./helper');

module.exports = parser;

function parser(query) {
	const operations = {};
	Object.entries(query)
		.forEach(([attribute, filter]) => {
			if(!filter.includes('.')) return;
			const [operation, value] = filter.split('.');
			if (validate(operation)) { 
				operations[attribute] = { [operation]: cast(value) }; 
				delete query[attribute];
			}	
		});
	return { ...query, operations};
}