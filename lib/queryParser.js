'use strict';

const baseMapper = require('./mappers/baseMapper'); 
const parser = require('./util/parser');
const sequelizeMapper = require('./mappers/sequelize');

module.exports = {
	parser,
	baseMapper,
	sequelizeMapper
};
