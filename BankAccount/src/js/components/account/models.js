/**
 * ACCOUNT MODELS
 */

$(function() {

	// a model for an account
	App.AccountModel = Backbone.Model.extend({
		localStorage : new Store('accounts'),
		defaults : {
			css : 'default', 	// this is only used when we have extra CSS files per account
			id : 'default',
			title : 'default',
			buttonId : 'default',
			balance : 200,
			interest : 0,
			overdraftProtection : 0,
			bonusPerMonth : 0,
			withdrawPenalty : 0
		},
		initialize : function() {
			this.fetch();
			this.on('change', this.save, this);
			this.set('transactions', new App.TransactionsList());
		},
		fetch : function() {
			this.set(JSON.parse(localStorage.getItem(this.id)));
			this.set('css','undefined');
		},
		save : function(attributes) {
			if (this.get('css') != 'undefined') this.unset('css');
			localStorage.setItem(this.id, JSON.stringify(this.toJSON()));
		},
		destroy : function(options) {
			localStorage.removeItem(this.id);
		},
		isEmpty : function() {
			return (_.size(this.attributes) <= 1);
		}
	});

});