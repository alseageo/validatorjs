// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('register a custom validation rule', function() {
	it('should have a telephone method on obj.validate.prototype', function() {
		Validator.register('telephone', function(val) {
			return val.match(/^\d{3}-\d{3}-\d{4}$/);
		});

		var validator = new Validator();
		expect(typeof validator.validate.telephone).toEqual('function');
	});

	it('should pass the custom telephone rule registration', function() {
		Validator.register('telephone', function(val) {
			return val.match(/^\d{3}-\d{3}-\d{4}$/);
		});

		var validator = new Validator({ phone: '213-454-9988' }, { phone: 'telephone' });
		expect(validator.passes()).toBeTruthy();
	});

	it('should fail the custom telephone rule registration with a default error message', function() {
		Validator.register('telephone', function(val) {
			return val.match(/^\d{3}-\d{3}-\d{4}$/);
		});

		var validator = new Validator({ phone: '4213-454-9988' }, { phone: 'telephone' });
		expect(validator.passes()).toBeFalsy();
		expect(validator.fails()).toBeTruthy();
		expect(validator.first('phone')).toEqual('The phone attribute has errors.');
	});

	it('should fail the custom telephone rule registration with a custom error message', function() {
		Validator.register('telephone', function(val) {
			return val.match(/^\d{3}-\d{3}-\d{4}$/);
		}, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');

		var validator = new Validator({ cell: '4213-454-9988' }, { cell: 'telephone' });
		expect(validator.first('cell')).toEqual('The cell phone number is not in the format XXX-XXX-XXXX.');
	});
});