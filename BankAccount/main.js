$(document).ready(function() {

	/**
	 * HOW DOES THIS WORK?
	 * 
	 * 
	 */

	/** CREATE MODELS & LOADERS FOR EACH PART OF THE APP * */

	var savingsModel = new App.AccountModel({
		css : 'src/resources/css/components/savings.css',
		id : 'savingsAccount',
		buttonId : 'savingsButton',
		title : 'Savings',
		interest : 3,
	});

	var checkingModel = new App.AccountModel({
		css : 'src/resources/css/components/checking.css',
		id : 'checkingAccount',
		buttonId : 'checkingButton',
		title : 'Checking',
		overDraftProtection : 500
	});

	var bonusSavingsModel = new App.AccountModel({
		css : 'src/resources/css/components/bonusSavings.css',
		id : 'bonusSavingsAccount',
		buttonId : 'bonusSavingsButton',
		title : 'Bonus Savings',
		interest : 3,
		balance : 5300,
		bonusPerMonth : 50,
		withdrawPenalty : 10
	});

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

	$('html').append('<p id="clearStorage" class="link">Clear Local Storage</p>');
	$('#clearStorage').click(function() {
		localStorage.clear();
		window.location.reload();
	});

});