	$('.menu-toggle').click(function() {
		$('.site-nav').toggleClass('site-nav--open', 400);
		$(this).toggleClass('open');
		$('html, body, #cover-container, #cover-text').toggleClass('noscroll');
	});

	// animate
	$('.site-nav a').click(function(){
		$('.site-nav').toggleClass('site-nav--open', 400);
		$('.menu-toggle').toggleClass('open');
		$('html, body, #cover-container, #cover-text').toggleClass('noscroll');
	});

	// initial
	$(document).ready(function(){
		$('#cover-text').load('../start.html');
	});

	// handle menu clicks
	$('.site-nav a').click(function() {
		var page = $(this).attr('href');
		$('#cover-text').load('../' + page + '.html');
		return false;
	});

	var is_xs = window.innerWidth < 630;
	if (!is_xs) {
		// initialize scroller
		var ps = new PerfectScrollbar('#cover-text', {});

	ps;
	
	} else {
		ps = null;
	};

	if (window.innerWidth < 630) {
		$('.site-nav a').click(function() {
			$('#cover-container').animate({scrollTop:$('#cover-text').position().top}, 'fast');
		})
	};


	/*$('.language-menu-toggle').click(function() {
  		$( "#language-menu" ).slideToggle(300);
	});

	// animate
	$('.language-menu-toggle').click(function(){
		$('.language-menu-toggle').toggleClass('open', 300);
	});*/

	// perfectscrollbar disabling

	



	
	/*if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$("#cover-text"). perfectScrollbar('destroy');
		ps = null;
	} else 
	{
		
	}*/
	/*function setSize() {
		if (window.width > 479) {
 			$("#cover-text"). perfectScrollbar('destroy');
			ps = null;
		}
	
	};

	$(document).ready(function () {
		setSize();
	  });

	$(window).resize(setSize);

	setSize();*/
