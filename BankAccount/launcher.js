/**
 * 
 */

$(function() {

	loading();

	$.getScript('main.js', function() {
		open();
	}, 2000);

	function loading() {

		/** presents loading animation * */
		$('body').css('display', 'none');
		$('html').append('<div id="loading">Loading... Please Wait.</div>');

	}
	;

	function open() {

		/** presents application and removes loading screen * */
		$('#loading').fadeOut(function() {
			$('body').fadeIn(400);
		});
	}
	;

});
