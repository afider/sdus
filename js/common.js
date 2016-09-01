
$(function() {

	document.getElementById('svg-icons').innerHTML = SVG_SPRITE;

	animateNavigation ();
	goToElement ();
	detectIfScroll();
	initCustomSelect ();

	// инициализация плагина для адаптивных таблиц
	$('.table_responsive').cardtable();

	$('.js-slider').bxSlider({
		mode: 'fade',
		minSlides: 1,
		maxSlides: 1,
		slideMargin: 0,
		auto: true,
		pause: 5000,
		speed: 1000,
		autoHover: true

	});

	$( window ).resize(function() {
 detectIfScroll();
});
	window.onscroll = function() {

		detectIfScroll();
	
	};

});


function initCustomSelect () {

	$('.js-select').customSelect();
} // initCustomSelect ()


function detectIfScroll () {
	
	var scrollFromTop = $(window).scrollTop();
	var targetBlock = $('.header');
	var scrolledState = 'is-scrolled';
	var header = $('.header');
	var menu = $('.main-nav');
	var menuItems = $('.main-nav__i');
	var activeState = 'is-active';
	var hiddenState = 'is-hidden';
	var goToTopButton = $('.go-to-top');

	var wH = $(window).height();
	var docH = $(document).height();

	if (scrollFromTop > 150) { // go-to-top display\hide 

		goToTopButton.removeClass(hiddenState);
	} else	{

		goToTopButton.addClass(hiddenState);
	}

	if (scrollFromTop > targetBlock.height() && window.matchMedia('(min-width: 961px)').matches) {
		header.css({
			paddingBottom: menu.height()
		});
		menu.addClass( scrolledState );
	} else	{
		header.css({
			paddingBottom: '0'
		});
		menu.removeClass( scrolledState );
	}

} // detectIfScroll


function animateNavigation () {
	
	var animationAllow = 'is-animate';
	var openState = 'is-open';
	var nav = $('.js-nav');
	var navControl = $('.js-nav__control');
	var navPhone = $('.js-nav__phone');

	navControl.on('click', function(e) {

		e.preventDefault();
		
		navControl.toggleClass(openState);
		navPhone.toggleClass(openState);
		nav.toggleClass(openState);
		$('body').toggleClass(openState);

		// for not alowing animation during resizing the window
		setTimeout(function() {

			navControl.toggleClass(animationAllow);
			nav.toggleClass(animationAllow);
		}, 300);

		
	});

} // animateNavigation



function goToElement () {

	var animationAllow = 'is-animate';
	var openState = 'is-open';
	var nav = $('.js-nav');
	var navControl = $('.js-nav__control');
	var navPhone = $('.js-nav__phone');
	var navH = 40;

	$(".js-goto").click(function(e) {

		nav.removeClass(animationAllow + ' ' + openState);
		navControl.removeClass(animationAllow + ' ' + openState);
		navPhone.removeClass(openState);
		$('body').removeClass(openState);

		var self = $(this),
			targetClass = self.data('goto');
		    target = $(targetClass);

		var speed = 1000;

		 e.preventDefault();


	    $('html, body').stop().animate({
	        scrollTop: target.offset().top - (navH + 10)
	        
	    }, speed, 'easeInOutCubic');
	});

} // goToElement

