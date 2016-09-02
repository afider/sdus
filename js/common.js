
$(function() {

	document.getElementById('svg-icons').innerHTML = SVG_SPRITE;

	animateNavigation ();

});

function animateNavigation () {
	
	$('.js-nav .main-nav__ctrl').each(function() {
		
		$(this).on('click', function() {
			
			if ( $(this).closest('.main-nav__i').hasClass('is-open') ) {

				$(this).closest('.main-nav__i').removeClass('is-open').find('.main-nav__sub').stop().slideUp('fast');
			} else {
				$(this).closest('.main-nav__i').addClass('is-open').find('.main-nav__sub').stop().slideDown('fast');
			}
		});
	});
} // animateNavigation

