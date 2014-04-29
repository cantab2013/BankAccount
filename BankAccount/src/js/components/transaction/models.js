/**
 * TRANSACTION MODELS
 */

$(function() {

	// a single transaction
	App.Transaction = Backbone.Model.extend({
		localStorage : new Store('transactions'),
		defaults : {
			type : 'none',
			account : 'none',
			amount : 0,
			date : 0,
		},
	});

});