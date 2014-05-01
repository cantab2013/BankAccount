/**
 * TRANSACTION HELPER CLASSES
 */

$(function() {

	// view for transaction focus close button
	App.CloseButton = Backbone.View.extend({
		tagName : 'h4',
		className : 'link',
		events : {
			'click' : 'reload'
		},
		render : function() {
			$(this.el).html('Close');
			$(this.el).addClass('alignRight');
		},
		initialize : function() {
			this.render();
		},
		reload : function() {
			$('#focusView').remove();
			App.CURRENT.reload();
		}
	});

	// view for transaction delete button
	App.DeleteButton = Backbone.View.extend({
		tagName : 'h4',
		className : 'link',
		events : {
			'click' : 'remove'
		},
		remove : function() {
			this.model.destroy();
			$('#focusView').remove();
			console.log(App.CURRENT);
			App.CURRENT.reload();
		},
		render : function() {
			$(this.el).text('Delete');
			$(this.el).addClass('alignLeft');
		},
		initialize : function() {
			this.render();
		}
	});

	// general view for deposit & withdraw buttons
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
				$('#focusView').remove();
			});
		}
	});

	// general view for deposit & withdraw panels
	App.ModifyPanel = Backbone.View.extend({
		className : 'modifyPanel',
		render : function(options) {
			var self = this;
			var model = this.model;
			$(this.el).attr('id', options.viewId);
			$(this.el).css('text-align', 'center');
			$(this.el).append('<h2 id="operationLabel">' + options.type + '</h2>');
			$(this.el).append('<hr>');
			$(this.el).append('<h2><input type="text" id="' + options.inputId + '"></h2>');
			$(this.el).append('<hr>');
			$(this.el).append('<h3 class="link" id="submitButton">Submit</h3>');
			$(this.el).on('click', '#submitButton', function() {
				console.log('DEBUG: ModifyPanel: render(): submit button clicked');
				var val = $('#' + options.inputId).val().trim();
				if (!isNaN(val) && val != "") {
					if (options.type == 'Withdraw') {
						model.set('balance', model.get('balance') - (+val));
					} else if (options.type == 'Deposit') {
						model.set('balance', model.get('balance') + (+val));
					}
					App.CURRENT.addTransaction(new App.Transaction({
						type : options.type,
						amount : val,
						account : model.get('id'),
						title : model.get('title')
					}));
					self.close();
				} else {
					$(self.el).append('<p id="invalidEntry">Invalid Entry</p>');
				}
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
