const parser = require('../util/parser'); 

module.exports = baseMapper;

function baseMapper(req, res, next) {
	req.query = parser(req.query);
	next();
}