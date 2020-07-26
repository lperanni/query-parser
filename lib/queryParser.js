'use strict';

const baseMapper = require('./mappers/base'); 
const parser = require('./util/parser');
const sequelizeMapper = require('./mappers/sequelize');

module.exports = {
	parser,
	baseMapper,
	sequelizeMapper
};
