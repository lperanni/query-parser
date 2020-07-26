const { Op } = require('sequelize');
const parser = require('../util/parser'); 

module.exports = sequelizeMapper;

function sequelizeMapper(req, res, next) {
	req.query = parser(req.query, operationMapper);
	next();
}

const mapper = new Map();

mapper.set('in', arg => arg);
mapper.set('notIn', arg => ({ [Op.notIn]: arg }));
mapper.set('gt', arg => ({ [Op.gt]: arg }));
mapper.set('lt', arg => ({ [Op.lt]: arg }));
mapper.set('gte', arg => ({ [Op.gte]: arg }));
mapper.set('lte', arg => ({ [Op.lte]: arg }));
mapper.set('eq', arg => ({ [Op.eq]: arg }));
mapper.set('ne', arg => ({ [Op.ne]: arg }));
mapper.set('ts', arg => ({ [Op.iLike]: `%${arg}%` }));
mapper.set('between', arg => ({ [Op.between]: arg }));
mapper.set('notBetween', arg => ({ [Op.between]: arg }));
mapper.set('like', arg => ({ [Op.like]: arg }));
mapper.set('notLike', arg => ({ [Op.notLike]: arg }));
mapper.set('iLike', arg => ({ [Op.iLike]: arg }));
mapper.set('notILike', arg => ({ [Op.notILike]: arg }));
mapper.set('is', arg => ({ [Op.is]: arg }));
mapper.set('not', arg => ({ [Op.not]: arg }));
mapper.set('like', arg => ({ [Op.like]: arg }));
mapper.set('or', arg => ({ [Op.or]: arg }));
mapper.set('startsWith', arg => ({ [Op.startsWith]: arg }));
mapper.set('endsWith', arg => ({ [Op.endsWith]: arg }));
mapper.set('substring', arg => ({ [Op.substring]: arg }));
mapper.set('regexp', arg => ({ [Op.regexp]: arg }));
mapper.set('notRegexp', arg => ({ [Op.notRegexp]: arg }));
mapper.set('iRegexp', arg => ({ [Op.noiRegexptLike]: arg }));
mapper.set('notIRegexp', arg => ({ [Op.notIRegexp]: arg }));

function operationMapper(operation, value){
	return mapper.get(operation)(value);
}
