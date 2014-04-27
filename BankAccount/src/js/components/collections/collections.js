/**
 * COLLECTIONS
 */

$(function() {

	// a collection of transactions
	App.TransactionsList = Backbone.Collection.extend({
		model : App.Transaction,
		localStorage : new Store('transactions'),
		initialize : function(options) {
			console.log('DEBUG: TransactionsList: initialize(): fetching models');
			this.fetch();
			console.log('DEBUG: TransactionsList: initialize(): fetched ' + this.length + ' models from local storage');
			console.log('DEBUG: TransactionsList: initialize(): removing all but *' + options.id + '* transactions');
			var self = this;
			this.forEach(function(item) {
				console.log(item.toJSON());
			});		
		}
	});

});
