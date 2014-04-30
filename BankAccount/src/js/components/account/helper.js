/**
 * ACCOUNT HELPER CLASSES
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
			$(this.el).html(this.model.get('title'));
		},
		initialize : function() {
			this.render();
			$(this.el).on('click', function() {
				$('article').show();
			});
			$(this.el).addClass('navElement');
			$(this.el).attr('id', this.model.get('buttonId'));
		}
	});

	// view for balance of a specific account
	App.BalanceView = Backbone.View.extend({
		className : 'balanceView',
		template : _.template('<h1><span class="account"><%= title %>:</span><span class="balance">$<%= balance %></span>'),
		render : function() {
			$(this.el).html(this.template(this.model.toJSON()));
		},
		initialize : function() {
			this.render();
		}
	});

});