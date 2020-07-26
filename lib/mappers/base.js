const parser = require('../util/parser'); 

module.exports = baseMapper;

function baseMapper(mapper) {
	return function(req, res, next) {
		req.query = parser(req.query, mapper);
		next();
	};
}