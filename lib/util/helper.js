// Here we check if the argument is an array or a boolean, as the Date constructor can handle a string but the Boolean constructor can't detect
// boolean values in quotations (ex. 'false').


exports.cast = function castArgType(arg) {
	if (arg === 'false') return false;
	if (arg === 'true') return true;
	if (arg.split(',').length > 1) return arg.split(',');
	return arg;
};
