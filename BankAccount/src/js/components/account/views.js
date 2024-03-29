/**
 * ACCOUNT VIEWS
 */

$(function() {

	// view for account page
	App.AccountView = Backbone.View.extend({
		el : 'article',
		render : function() {
			App.CURRENT = this;
			console.log('DEBUG: AccountView: render(): rendering AccountView');
			console.log('DEBUG: AccountView: render(): instantiating BalanceView');
			var balanceView = new App.BalanceView({
				model : this.model
			});
			console.log('DEBUG: AccountView: render(): instantiating TransactionsListView');
			var transactionsListView = new App.TransactionsListView({
				model : this.model,
				collection : this.model.get('transactions')
			});
			console.log('DEBUG: AccountView: render(): instantiating WithdrawButton');
			var withdrawButton = new App.ModifyButton({
				model : this.model,
				type : 'Withdraw',
				inputId : 'withdrawInput',
				viewId : 'withdrawPanel',
				buttonId : 'withdrawButton',
			});
			console.log('DEBUG: AccountView: render(): instantiating DepositButton');
			var depositButton = new App.ModifyButton({
				model : this.model,
				type : 'Deposit',
				inputId : 'depositInput',
				viewId : 'depositPanel',
				buttonId : 'depositButton',
			});
			console.log('DEBUG: AccountView: render(): appending BalanceView');
			$(this.el).append(balanceView.el);
			console.log('DEBUG: AccountView: render(): appending TransactionsListView');
			$(this.el).append(transactionsListView.el);
			$(transactionsListView.el).dataTable({
				"aaSorting" : [ [ 2, 'desc' ] ]
			});
			$(transactionsListView.el).css('width', '100%');

			console.log('DEBUG: AccountView: render(): appending WithdrawButton');
			$('nav').append(withdrawButton.el);
			console.log('DEBUG: AccountView: render(): appending DepositButton');
			$('nav').append(depositButton.el);
			$(this.el).show();
		},
		update : function() {
			this.close();
			this.render();
		},
		addTransaction : function(transaction) {
			var self = this;
			transaction.set('date', new Date().toUTCString());
			App.CURRENT.model.get('transactions').create(transaction.toJSON(), {
				success : function() {
					self.update();
				}
			});
		},
		close : function() {
			$(this.el).hide();
			$(this.el).empty();
		},
		reload : function() {
			console.log('DEBUG: AccountView: reload(): reloading account view');
			this.close();
			this.render();
			$(this.el).show();
		},
		initialize : function() {
			console.log('DEBUG: AccountView: initialize(): initializing AccountView');
			this.render();
		}
	});

	// view that handles loading of each view
	App.AccountLoader = Backbone.View.extend({
		el : 'article',
		render : function() {
			var self = this;
			if (!(typeof App.CURRENT === 'undefined'))
				App.CURRENT.close();
			App.CURRENT = self;
			self.buildAccount(self.model);
			$(self.el).prepend(new App.ResourceView({
				model : self.model
			}).el);
		},
		buildAccount : function(model) {
			console.log('DEBUG: AccountLoader: buildAccount(): instantiating AccountView');
			var accountView = new App.AccountView({
				model : model
			});
		},
		initialize : function() {
			this.addButton(this);
			this.model.on('change', this.render(), this);
		},
		addButton : function(next) {
			this.button = new App.ButtonView({
				model : this.model,
				className : 'link',
				events : {
					'click' : function() {
						$('#focusView').remove();
						App.CURRENT.close();
						next.render();
						$('.modifyPanel').remove();
					}
				}
			});
			$('nav').append(this.button.el);
		}

	});

});