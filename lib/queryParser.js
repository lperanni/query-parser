'use strict';

const mapper = new Map();


const apiQueryParser = (req, res, next) => {
	const filters = {};
	const { limit, offset, ...query } = req.query;
	Object.entries(query)
		.forEach(([attribute, filter]) => {
			filters[attribute] = parseFilter(filter);
		});
	req.query = { filters, pagination: { limit, offset } };
	next();
};

module.exports = { apiQueryParser, validateFilters };

function parseFilter(raw) {
	const [maybeOperation, value] = raw.split('.');
	const operation = mapper.get(maybeOperation);
	return operation ? operation(value) : raw;
}

function validateFilters(filters = {}, rawAttributes, modelName) {
	const errors = {};
	const validAttributes = Object.keys(rawAttributes);
	const filteredAttributes = Object.keys(filters);
	filteredAttributes.forEach(it => {
		if (validAttributes.includes(it)) return;
		errors[it] = `Attribute doesn't exist on "${modelName}" resource.`;
	});
	return errors;
}
