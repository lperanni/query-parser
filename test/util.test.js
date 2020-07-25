const parser = require('../lib/util/parser');
const { expect } = require('chai');

describe('Utility functions', () => {
	describe('Parser', () => {
    
		const exampleInput = {
			limit: '6',
			offset: '0',
			name: 'ts.Text',
			randomParam: 'thisisnotpartofthelang',
			notSupportedOperation: 'op.Test',
			id: 'in.9,8,7,6',
			available: 'eq.false',
			startDate: 'lte.20/07/2020',
		};
		const test = parser(exampleInput);
    
		it('Should add an \'operation\' key to the original object', () => {
			expect(test).to.haveOwnProperty('operations');
		});
		it('Should not parse keys with unsupported operation names', () => {
			const query = test;
			expect(query.operations).to.not.haveOwnProperty('notSupportedOperations');
		});
		it('Should remove valid query params if they are placed in operations object', () => {
			expect(test).to.not.haveOwnProperty('id');
			expect(test).to.not.haveOwnProperty('available');
			expect(test).to.not.haveOwnProperty('startDate');
			expect(test).to.not.haveOwnProperty('name');
		});
		it('Should turn parsed fields into objects with operation name and value', () => {
			expect(test.operations).to.deep.include({ name: { ts: 'Text' }});
			expect(test.operations).to.deep.include({ id: { in: ['9','8','7','6'] }});
			expect(test.operations).to.deep.include({ available: { eq: false }});
			expect(test.operations).to.deep.include({ startDate: { lte: '20/07/2020' }});
		});
		it('Should not alter params that are not handled by parser', () => {
			expect(test.limit).to.equal('6');
			expect(test.offset).to.equal('0');
		});
	});
});