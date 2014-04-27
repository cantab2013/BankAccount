/**
 * ACCOUNT MODELS
 */

$(function() {

	// a model for an account
	App.AccountModel = Backbone.Model.extend({
		defaults : {
			css : 'default',
			id : 'default',
			balance : 200,
			interest : 0,
			overdraftProtection : 0,
			bonusPerMonth : 0,
			withdrawPenalty : 0
		},
		initialize : function() {
			this.set('transactions', new App.TransactionsList({
				id : this.id
			}));
		}
	});

});