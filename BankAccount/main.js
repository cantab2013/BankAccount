/**
 * HOW DOES THIS WORK?
 */

$(document).ready(function() {

	/*
	 * MAIN OBJECT
	 */

	// 'Launcher' contains three methods, one for showing the loading message,
	// one
	// for actually loading the application, and one for showing the application
	// after it has finished loading
	Launcher = {

		// shows the loading screen, accepts a callback. in this case, the
		// callback will be the Launcher.loadApp() method (see the last function
		// call in this script)

		showLoading : function(callback) {

			// append the loading message to the page

			$('html').append('<div id="loading"><p>Loading... Please Wait.</p></div>');

			// callback function. setTimeout() with a duration of zero
			// effectively adds the function inside to the end of the execution
			// queue so that functions before it can finish. this is used for
			// all three steps of the launch sequence

			setTimeout(function() {
				callback(Launcher.showApp);
			}, 0);

		},

		// loads the entire application. this function creates the top-level
		// backbone views (AccountLoader) for each account, and renders the
		// default view. this function can take a while due to the fetching of
		// every transaction from local storage (the actual fetching doesn't
		// happen here, it happens further down the line when the AccountView
		// builds the TransactionsListView)

		loadApp : function(callback) {

			/* create models for each account */

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

			// top-level view for savings
			var savingsLoader = new App.AccountLoader({
				model : savingsModel
			});

			// top-level view for checking
			new App.AccountLoader({
				model : checkingModel
			});

			// top-level view for bonus savings
			new App.AccountLoader({
				model : bonusSavingsModel
			});

			/*
			 * ADD RANDOM TRANSACTIONS IF LOCALSTORAGE IS EMPTY
			 */

			if (localStorage.length <= 3) {
				showAlert();
			}

			/*
			 * OPEN DEFAULT PAGE
			 */

			savingsLoader.render();

			/*
			 * FOR DEVELOPMENT PURPOSES
			 */

			// add developer section
			$('html').append('<div id="developer"></div>');

			// add clear storage button
			$('#developer').append('<p id="clearStorage" class="link">Clear Local Storage</p>');
			$('#clearStorage').click(function() {
				clearStorage();
			});

			// add a button to genereate some random transactions
			$('#developer').append('<p id="generateTransactions" class="link">Generate 50 Transactions</p>');
			$('#generateTransactions').click(function() {
				generate(savingsModel, checkingModel, bonusSavingsModel);
			});

			// the function that was passed into Launcher.loadApp was
			// Launcher.showApp, so once we reach this point and execute the
			// callback, everything is fully loaded and should fade in smoothly.
			// (refer to the first callback method in Launcher.showLoading() to
			// see what the point of setTimeout() with a duration of 0 is)

			setTimeout(function() {
				callback();
			}, 0);

		},

		// fades out the loading text and fades in the fully loaded application

		showApp : function() {

			// another example of a callback method - after the loading text
			// fades out fully, we fade in the body element

			$('#loading').fadeOut(function() {
				$('body').fadeIn(400);
			});
		}
	};

	/*
	 * BEGIN APP LAUNCH SEQUENCE
	 */

	// in order to have 'showLoading()', 'loadApp()', and 'showApp()' run
	// sequentially (as opposed to synchronously), we must utilize callbacks.
	// Here, we call showLoading() with loadApp passed in as a parameter. Notice
	// that there are no parenthesis, so the function doesnt get called and is
	// instead passed in as a variable.
	Launcher.showLoading(Launcher.loadApp);

});

/** LOCAL STORAGE ALERT **/

function showAlert() {
	setTimeout(function() {
		$('html').append('<div id="storageAlert">Local Storage is Empty. Click "Generate 50 Transactions"</div>');
		$('#storageAlert').fadeIn(500, function() {
			setTimeout(function() {
				$('#storageAlert').fadeOut(1000);
			}, 3000);
		});
	}, 1000);
	
}

/** CLEAR STORAGE * */

function clearStorage() {
	localStorage.clear();
	location.reload();
};

/** GENERATE RANDOM TRANSACTIONS * */

function generate(savingsModel, checkingModel, bonusSavingsModel) {
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
};
