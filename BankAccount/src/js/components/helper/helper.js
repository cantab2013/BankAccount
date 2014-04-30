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

	App.ModifyButton = Backbone.View.extend({
		className : 'link',
		render : function(options) {
			console.log('DEBUG: DepositButon: render(): rendering deposit button');
			$(this.el).attr('id', options.buttonId);
			$(this.el).html(options.type);
			$(this.el).addClass('navElement');
			$(this.el).addClass('modifyButton');
		},
		initialize : function(options) {
			console.log('DEBUG: DepositButon: initialize(): initializing deposit button');
			if ($('#' + options.buttonId).length) {
				console.log('DEBUG: DepositButon: initialize(): deposit button already exists, removing it.');
				$('#' + options.buttonId).remove();
			}
			this.model = options.model;
			this.render(options);
			var self = this;
			$(this.el).on('click', function() {
				console.log('DEBUG: DepositButon: openDepositPanel(): deposit button clicked, opening deposit panel');
				console.log(self.model.get('id'));
				new App.ModifyPanel(options);
			});
		}
	});

	App.ModifyPanel = Backbone.View.extend({
		className : 'modifyPanel',
		render : function(options) {
			var self = this;
			var model = this.model;
			$(this.el).attr('id', options.viewId);
			$(this.el).css('text-align', 'center');
			$(this.el).append('<h2 id="operationLabel">' + options.type + '</h2>');
			$(this.el).append('<input type="text" id="' + options.inputId + '">');
			$(this.el).append('<h3 class="link" id="submitButton">Submit</h3>');
			$(this.el).on('click', '#submitButton', function() {
				console.log('DEBUG: ModifyPanel: render(): submit button clicked');
				var val = $('#' + options.inputId).val().trim();
				if (!isNaN(val) && val != "") {
					model.set('balance', model.get('balance') + (+val));
					App.CURRENT.addTransaction(new App.Transaction({
						type : options.type,
						amount : val,
						account : model.get('id')
					}));
				}
				self.close();
			});
			$(this.el).append('<h3 class="link" id="cancelButton">Cancel</h3>');
			$(this.el).on('click', '#cancelButton', function() {
				console.log('DEBUG: ModifyPanel: render(): cancel button clicked');
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
			console.log('DEBUG: ModifyPanel: close(): closing the panel');
			$(this.el).hide();
			$(this.el).remove();
			$('article').show();
		},
		initialize : function(options) {
			$('.modifyPanel').remove();
			if (!$('#' + this.id).length)
				this.render(options);
		}
	});
});
