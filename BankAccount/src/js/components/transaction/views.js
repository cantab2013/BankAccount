/**
 * TRANSACTION VIEWS
 */

$(document).ready(
		function() {

			// view for a single transaction
			App.TransactionView = Backbone.View.extend({
				model : App.Transaction,
				tagName : 'tr',
				className : 'link',
				template : _.template('<td><%= type %></td><td><%= amount %></td><td><%= date %></td></tr>'),
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
				className : 'tablesorter',
				id : 'transactionsList',
				render : function() {
					console.log('DEBUG: TransactionsListView: initialize(): rendering TransactionsListView with model(id): ' + this.model);
					$(this.el).empty();
					console.log('DEBUG: TransactionsListView: initialize(): collection size: ' + this.collection.length);
					$(this.el).append('<thead><tr class="header"><td>Type</td><td>Amount</td><td>Date</td></tr></thead>');
					$(this.el).append('<tbody>');
					for (var i = 0; i < this.collection.length; i++) {
						if (this.collection.at(i).get('account') == this.model.get('id')) {
							$(this.el).append(new App.TransactionView({
								model : this.collection.at(i),
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
				id : 'focusView',
				className : 'focusView',
				render : function() {
					console.log('DEBUG: FocusView: render(): Rendering Focus View');
					$(this.el).append('<h2>' + this.model.get('type') + '</h2>');
					$(this.el).append('<hr>');
					InfoTable = Backbone.View.extend({
						model : this.model,
						tagName : 'table',
						render : function() {
							$(this.el).append(
									'<tr><td class="label"><strong>Account:</strong></td><td class="value"><strong>' + this.model.get('title')
											+ '</strong></td></tr>');
							$(this.el).append(
									'<tr><td class="label"><strong>Amount:</strong></td><td class="value"><strong>' + this.model.get('amount')
											+ '</strong></td></tr>');
						},
						initialize : function() {
							this.render();
						}
					})
					$(this.el).append(new InfoTable().el);
					$(this.el).append('<hr>');
					$(this.el).append('<p>' + this.model.get('date') + '</p>');
					$(this.el).append('<hr>');
					var closeButton = new App.CloseButton();
					$(this.el).append(closeButton.el);
					var deleteButton = new App.DeleteButton({
						model : this.model
					});
					$(this.el).append(deleteButton.el);
				},
				initialize : function() {
					var self = this;
					$('article').hide();
					$('#focusView').remove();
					self.render();
					$('body').append(self.el);
					$(self.el).show();
				},
				close : function() {
					$(this.el).hide();
					$(this.el).remove();
					$('article').show();

				}
			});
		});