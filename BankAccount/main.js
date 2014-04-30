$(document).ready(function() {

	/**
	 * HOW DOES THIS WORK?
	 * 
	 * 
	 */

	/** CREATE MODELS & LOADERS FOR EACH PART OF THE APP * */

	var savingsModel = new App.AccountModel({
		css : 'src/resources/css/components/savings.css',
		id : 'Savings',
		interest : 3,
	});

	var checkingModel = new App.AccountModel({
		css : 'src/resources/css/components/checking.css',
		id : 'Checking',
		overDraftProtection : 500
	});

	var bonusSavingsModel = new App.AccountModel({
		css : 'src/resources/css/components/bonusSavings.css',
		id : 'Bonus Savings',
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
	
	/** OPEN DEFAULT PAGE **/
	
	savingsLoader.render();

});