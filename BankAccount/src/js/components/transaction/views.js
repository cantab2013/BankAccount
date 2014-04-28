/**
 * TRANSACTION VIEWS
 */

$(function() {

	// view for a single transaction
	App.TransactionView = Backbone.View.extend({
		model : App.Transaction,
		tagName : 'tr',
		className : 'link',
		template : _.template('<td><%= type %></td><td><%= account %></td><td><%= amount %></td></tr>'),
		render : function() {
			$(this.el).html(this.template(this.model.toJSON()));
		},
		events : {
			'click' : 'focus',
		},
		remove : function() {
			this.model.destroy();
			$(this.el).remove();
		},
		initialize : function() {
			this.render();
			this.model.on('change', this.render(), this);
		},
		focus : function() {
			var focusView = new App.FocusView({
				model : this.model
			});
		}
	});

	// view for a collection of transactions
	App.TransactionsListView = Backbone.View.extend({
		tagName : 'table',
		id : 'transactionsList',
		render : function() {
			console.log('DEBUG: TransactionsListView: initialize(): rendering TransactionsListView with model(id): ' + this.model);
			$(this.el).empty();
			console.log('DEBUG: TransactionsListView: initialize(): collection size: ' + this.collection.length);
			$(this.el).append('<thead><tr class="header"><td>Type</td><td>Account</td><td>Amount</td></tr></thead>');
			$(this.el).append('<tbody>');
			for (var i = 0; i < this.collection.length; i++) {
				if (this.collection.at(i).get('account') == this.model.get('id')) {
					$(this.el).append(new App.TransactionView({
						model : this.collection.at(i)
					}).el);
				}
			}
			;
			$(this.el).append('</tbody>');
		},
		initialize : function() {
			console.log('DEBUG: TransactionsListView: initialize(): initializing');
			this.render();
			this.collection.on('change', this.render(), this);
			this.collection.on('add', this.render(), this);
		}
	});

	// view for single item
	App.FocusView = Backbone.View.extend({
		className : 'focusView',
		render : function() {
			console.log('DEBUG: FocusView: render(): Rendering Focus View');
			$(this.el).append('<h2>' + this.model.get('type') + '</h2>');
			$(this.el).append('<h3>' + this.model.get('account') + '</h3>');
			$(this.el).append('<p>' + this.model.get('amount') + '</p>');
			$(this.el).append('<hr>');
			$(this.el).append('<p>' + this.model.get('date') + '</p>');
			var self = this;
			$(this.el).append('<p class="link">Close</p>').click(function() {
				close(self);
			});

			var Delete = Backbone.View.extend({
				className : 'link',
				events : {
					'click' : 'remove'
				},
				remove : function() {
					this.model.destroy();
					var reload = App.CURRENT;
					App.CURRENT.close();
					reload.render();
				},
				render : function() {
					$(this.el).text('Delete');
				}
			});
			var deleteButton = new Delete({
				model : this.model
			});
			deleteButton.render();
			$(this.el).append(deleteButton.el);

			var close = function(self) {
				self.close();
			};
		},
		initialize : function() {
			$('article').fadeOut(300);
			$('#focusView').remove();
			$('body').append('<div id="focusView"></div>');
			this.el = '#focusView';
			this.render();
		},
		close : function() {
			$(this.el).fadeOut(300, function() {
				$('article').fadeIn(300);
			});
			$(this.el).remove();
		}
	});

});