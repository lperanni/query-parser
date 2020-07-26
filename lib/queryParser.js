'use strict';

const base = require('./mappers/base'); 
const parser = require('./util/parser');
const sequelizeMapper = require('./mappers/sequelize');

module.exports = {
	parser,
	base,
	sequelizeMapper
};
