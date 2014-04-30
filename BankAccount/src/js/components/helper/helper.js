/**
 * HELPER CLASSES
 */

$(function() {

	// view for adding the resources specified in the model
	App.ResourceView = Backbone.View.extend({
		className : 'currentResources',
		template : _.template('<link rel="stylesheet" href="<%= css %>">'),
		render : function() {
			$(this.el).html(this.template(this.model.toJSON()));
		},
		initialize : function() {
			this.render();
		}
	});

	// view for button present in navbar
	App.ButtonView = Backbone.View.extend({
		className : 'navElement',
		render : function() {
			$(this.el).html(this.model.toJSON().id);
		},
		initialize : function() {
			this.render();
			$(this.el).on('click', function() {
				$('article').show();
			});
			$(this.el).addClass('navElement');
		}
	});

	// view for balance of a specific account
	App.BalanceView = Backbone.View.extend({
		className : 'balanceView',
		template : _.template('<h1><span class="account"><%= id %>:</span><span class="balance">$<%= balance %></span>'),
		render : function() {
			$(this.el).html(this.template(this.model.toJSON()));
		},
		initialize : function() {
			this.render();
		}
	});

	// view for withdraw button
	App.WithdrawButton = Backbone.View.extend({
		id : 'withdrawButton',
		className : 'link',
		events : {
			'click' : function() {
				console.log('DEBUG: WithdrawButon: openWithdrawPanel(): withdraw button clicked, opening withdraw panel');
				var withdrawPanel = new App.WithdrawPanel({
					model : this.model
				});
			}
		},
		render : function() {
			console.log('DEBUG: WithdrawButon: render(): rendering withdraw button');
			$(this.el).html('Withdraw');
			$(this.el).addClass('navElement');
			$(this.el).addClass('modifyButton');
		},
		initialize : function() {
			console.log('DEBUG: WithdrawButon: initialize(): initializing withdraw button');
			if ($('#' + this.id).length) {
				console.log('DEBUG: WithdrawButon: initialize(): withdraw button already exists, removing it.');
				$('#' + this.id).remove();
			}
			this.render();
		}
	});

	// view for deposit button
	App.DepositButton = Backbone.View.extend({
		id : 'depositButton',
		className : 'link',
		events : {
			'click' : function() {
				console.log('DEBUG: DepositButon: openDepositPanel(): deposit button clicked, opening deposit panel');
				console.log(this.model.get('id'));
				var depositPanel = new App.DepositPanel({
					model : this.model
				});
			}
		},
		render : function() {
			console.log('DEBUG: DepositButon: render(): rendering deposit button');
			$(this.el).html('Deposit');
			$(this.el).addClass('navElement');
			$(this.el).addClass('modifyButton');
		},
		initialize : function() {
			console.log('DEBUG: DepositButon: initialize(): initializing deposit button');
			if ($('#' + this.id).length) {
				console.log('DEBUG: DepositButon: initialize(): deposit button already exists, removing it.');
				$('#' + this.id).remove();
			}

			this.render();
		}
	});

	// view for withdraw panel
	App.WithdrawPanel = Backbone.View.extend({
		id : 'withdrawPanel',
		className : 'modifyPanel',
		render : function() {
			var self = this;
			var model = this.model;
			$(this.el).css('text-align', 'center');
			$(this.el).append('<h2 id="operationLabel">Withdraw:</h2>');
			$(this.el).append('<input type="text" id="withdrawInput" name="withdraw">');
			$(this.el).append('<h3 class="link" id="submitButton">Submit</h3>');
			$(this.el).on('click', '#submitButton', function() {
				console.log('DEBUG: WithdrawPanel: render(): submit button clicked');
				var val = $('#withdrawInput').val().trim();
				if (!isNaN(val) && val != "") {
					model.set('balance', model.get('balance') - (+val));
					App.CURRENT.addTransaction(new App.Transaction({
						type : 'Withdrawal',
						amount : val,
						account : model.get('id'),
					}));
				}
				self.close();
			});
			$(this.el).append('<h3 class="link" id="cancelButton">Cancel</h3>');
			$(this.el).on('click', '#cancelButton', function() {
				console.log('DEBUG: WithdrawPanel: render(): cancel button clicked');
				self.close();
			});
			;
			$('article').hide();
			if ($('#' + this.id).length) {
				$('#' + this.id).hide();
				$('#' + this.id).remove();
			}
			$('body').append(this.el);
			$(this.el).show();

		},
		close : function() {
			console.log('DEBUG: WithdrawPanel: close(): closing the panel');
			$(this.el).hide();
			$(this.el).remove();
			$('article').show();
		},
		initialize : function() {
			$('#depositPanel').remove();
			if (!$('#' + this.id).length)
				this.render();
		}
	});

	// view for deposit panel
	App.DepositPanel = Backbone.View.extend({
		id : 'depositPanel',
		className : 'modifyPanel',
		render : function() {
			var self = this;
			var model = this.model;
			$(this.el).css('text-align', 'center');
			$(this.el).append('<h2 id="operationLabel">Deposit:</h2>');
			$(this.el).append('<input type="text" id="depositInput" name="deposit">');
			$(this.el).append('<h3 class="link" id="submitButton">Submit</h3>');
			$(this.el).on('click', '#submitButton', function() {
				console.log('DEBUG: DepositPanel: render(): submit button clicked');
				var val = $('#depositInput').val().trim();
				if (!isNaN(val) && val != "") {
					model.set('balance', model.get('balance') + (+val));
					App.CURRENT.addTransaction(new App.Transaction({
						type : 'Deposit',
						amount : val,
						account : model.get('id')
					}));
				}
				self.close();
			});
			$(this.el).append('<h3 class="link" id="cancelButton">Cancel</h3>');
			$(this.el).on('click', '#cancelButton', function() {
				console.log('DEBUG: DepositPanel: render(): cancel button clicked');
				self.close();
			});
			;
			$('article').hide();
			if ($('#' + this.id).length) {
				$('#' + this.id).hide();
				$('#' + this.id).remove();
			}
			$('body').append(this.el);
			$(this.el).show();

		},
		close : function() {
			console.log('DEBUG: DepositPanel: close(): closing the panel');
			$(this.el).hide();
			$(this.el).remove();
			$('article').show();
		},
		initialize : function() {
			$('#withdrawPanel').remove();
			if (!$('#' + this.id).length)
				this.render();
		}
	});
});
