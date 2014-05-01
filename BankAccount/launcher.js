/**
 * 
 */

$(function() {
	
	function loading() {

		/** presents loading screen * */
		$('body').css('display','none');
		$('html').append('<div id="loading"><p>Loading..</p></div>');

	};

	function open() {

		/** presents application and removes loading screen * */

		$('#loading').fadeOut(function() {
			$('body').fadeIn(400);
		});
	};
	
	$.when(loading()).done(function() {
		$.getScript('main.js', function() {
			open();
		});
	});
	
});