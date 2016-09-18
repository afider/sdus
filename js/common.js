var enableMagnific = true;

$(function() {

	document.getElementById('svg-icons').innerHTML = SVG_SPRITE;

	animateNavigation();
	animateFolding();
	initCustomSctoll();
	initModalImg();
	initCustomSelect();


	setTimeout(function() {

		$('.js-carousel').flickity({
			// options
			cellAlign: 'left',
			contain: true
		});

		$('.js-carousel').on( 'dragStart.flickity', function( event, pointer ) {
			enableMagnific = false;
		});

		$('.js-carousel').on( 'dragEnd.flickity', function( event, pointer ) {
			setTimeout(function() {
				enableMagnific = true;
			}, 100);
		});

	}, 0);

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


function animateFolding () {
	
	$('.js-folding .folding__h').each(function() {
		
		$(this).on('click', function() {
			
			if ( $(this).closest('.folding').hasClass('is-open') ) {

				$(this).closest('.folding').removeClass('is-open').find('.folding__body').stop().slideUp('fast');
			} else {
				$(this).closest('.folding').addClass('is-open').find('.folding__body').stop().slideDown('fast');
			}
		});
	});
} // animateFolding


function initCustomSelect () {

	$('.js-select').customSelect();
} // initCustomSelect ()

function initCustomSctoll () {
	
	$(".js-scroll").mCustomScrollbar({
		axis:"x",
		advanced:{
			autoExpandHorizontalScroll:true
		},
		mouseWheel:{ scrollAmount: 700 }
	});
} // initCustomSctoll


// Add it after jquery.magnific-popup.js and before first initialization code
$.extend(true, $.magnificPopup.defaults, {
  tClose: 'Закрыть (Esc)', // Alt text on close button
  tLoading: 'Идет загрузка...', // Text that is displayed during loading. Can contain %curr% and %total% keys
  gallery: {
    tPrev: 'Предыдущая (или кнопка «влево»)', // Alt text on left arrow
    tNext: 'Следающая (или кнопка «вправо»)', // Alt text on right arrow
    tCounter: '%curr% из %total%' // Markup for "1 of 7" counter
  },
  image: {
    tError: '<a href="%url%">Изображения по такой ссылке</a> нет.' // Error message when image could not be loaded
  },
  ajax: {
    tError: '<a href="%url%">Содержимое</a> не загружается.' // Error message when ajax request failed
  }
});


function initModalImg() {

	

	$('.js-img-zoom').magnificPopup({
		gallery:{enabled:true},
		delegate: '.js-img-zoom__target', // child items selector, by clicking on it popup will open
		type: 'image',
		disableOn: function() {return enableMagnific;},

		image: {
			titleSrc: function(item) {
				var imgDate = item.el.attr('data-date');
				var imgTitle = item.el.attr('title');
				if (imgDate === undefined) {imgDate = '';}
				if (imgTitle === undefined) {imgTitle = '';}
				var imgCapture = '<small class="mfp-title__date">' + imgDate + '</small>' + imgTitle;
				return imgCapture;
			}
		},

		mainClass: 'mfp-with-zoom', // this class is for CSS animation below

		  zoom: {
		    enabled: true, // By default it's false, so don't forget to enable it

		    duration: 300, // duration of the effect, in milliseconds
		    easing: 'ease-in-out', // CSS transition easing function 

		    // The "opener" function should return the element from which popup will be zoomed in
		    // and to which popup will be scaled down
		    // By defailt it looks for an image tag:
		    opener: function(openerElement) {
		      // openerElement is the element on which popup was initialized, in this case its <a> tag
		      // you don't need to add "opener" option if this code matches your needs, it's defailt one.
		      return openerElement.is('img') ? openerElement : openerElement.find('img');
		    }
		  }

	});
} // initModalImg ()

