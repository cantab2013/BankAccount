$(document).ready(function() {

	/** MAIN OBJECT * */

	// *
	// * AppView has three methods
	// *
	// * - loading:
	// * - - presents loading screen
	// * - load:
	// * - - actually loads the app
	// * - open:
	// * - - fades out loading screen & fades in body
	// *
	// * The final function in this script calls these functions
	// *
	// *
	Launcher = {

		loading : function() {

			/** presents loading message * */

			$('html').append('<div id="loading"><p>Loading... Please Wait.</p></div>');

		},

		open : function() {

			/** presents application and removes loading screen * */

			$('#loading').fadeOut(function() {
				$('body').fadeIn(400);
			});
		},

		load : function() {

			/** CREATE MODELS & LOADERS FOR EACH PART OF THE APP * */

			/* App.AccountModel is the base account */

			// create checking model directly from App.AccountModel
			var checkingModel = new App.AccountModel({
				css : 'src/resources/css/components/checking.css',
				id : 'checkingAccount',
				balance : 200,
				buttonId : 'checkingButton',
				title : 'Checking',
				overDraftProtection : 500
			});

			// create base SavingsModel to be extended
			var BaseSavingsModel = App.AccountModel.extend({
				defaults : {
					interest : 3
				}
			});

			// create savings model by extending BaseSavingsModel
			var savingsModel = new BaseSavingsModel({
				css : 'src/resources/css/components/savings.css',
				id : 'savingsAccount',
				buttonId : 'savingsButton',
				balance : 200,
				title : 'Savings'
			});

			// create bonus savings model by extending BaseSavingsModel
			var bonusSavingsModel = new BaseSavingsModel({
				css : 'src/resources/css/components/bonusSavings.css',
				id : 'bonusSavingsAccount',
				buttonId : 'bonusSavingsButton',
				title : 'Bonus Savings',
				balance : 5300,
				bonusPerMonth : 50,
				withdrawPenalty : 10
			});

			/* create loaders for each model */

			var savingsLoader = new App.AccountLoader({
				model : savingsModel
			});

			new App.AccountLoader({
				model : checkingModel
			});

			new App.AccountLoader({
				model : bonusSavingsModel
			});

			/** OPEN DEFAULT PAGE * */

			savingsLoader.render();

			/** FOR DEVELOPMENT * */

			$('html').append('<div id="developer"></div>');
			$('#developer').append('<p id="clearStorage" class="link">Clear Local Storage</p>');
			$('#clearStorage').click(function() {
				localStorage.clear();
				window.location.reload();
			});
			$('#developer').append('<p id="generateTransactions" class="link">Generate 50 Transactions</p>');
			$('#generateTransactions').click(function() {
				console.log('DEBUG: main.js: generating random transactions');
				for (var i = 0; i < 50; i++) {
					var account = Math.floor((Math.random() * 3));
					console.log('DEBUG: main.js: account: ' + account);
					var amount = Math.floor(Math.random() * 999);
					console.log('DEBUG: main.js: amount: ' + amount);
					var type = Math.floor(Math.random() * 2);
					console.log('DEBUG: main.js: type: ' + type);
					var transaction = new App.Transaction();
					transaction.set('amount', amount);
					transaction.set('date', new Date().toUTCString());
					switch (type) {
					case 0:
						transaction.set('type', 'Withdraw');
						break;
					case 1:
						transaction.set('type', 'Deposit');
					}
					;
					switch (account) {
					case 0:
						transaction.set('account', 'savingsAccount');
						transaction.set('title', 'Savings');
						if (type == 0)
							savingsModel.set('balance', savingsModel.get('balance') - (+amount));
						else
							savingsModel.set('balance', savingsModel.get('balance') + (+amount));
						break;
					case 1:
						transaction.set('account', 'checkingAccount');
						transaction.set('title', 'Checking');
						if (type == 0)
							checkingModel.set('balance', checkingModel.get('balance') - (+amount));
						else
							checkingModel.set('balance', checkingModel.get('balance') + (+amount));
						break;
					case 2:
						transaction.set('account', 'bonusSavingsAccount');
						transaction.set('title', 'Bonus Savings');
						if (type == 0)
							bonusSavingsModel.set('balance', bonusSavingsModel.get('balance') - (+amount));
						else
							bonusSavingsModel.set('balance', bonusSavingsModel.get('balance') + (+amount));
						break;
					}
					;
					transaction.save();
				}
				window.location.reload();
			});
		}
	};
	
//	setTimeout(Launcher.loading(),0);
//	setTimeout(Launcher.load(), 6000);
//	setTimeout(Launcher.open(),8000);
	
	Launcher.loading();
	Launcher.load();
	_.defer(Launcher.open());
	
});
