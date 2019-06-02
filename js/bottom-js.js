	$('.menu-toggle').click(function() {
		$('.site-nav').toggleClass('site-nav--open', 400);
		$(this).toggleClass('open');
		$('html, body, #cover-container, #cover-container-skole, #cover-text, #cover-text-skole, #help-text').toggleClass('noscroll');
	});

	// animate
	$('.site-nav a').click(function(){
		$('.site-nav').toggleClass('site-nav--open', 400);
		$('.menu-toggle').toggleClass('open');
		$('html, body, #cover-container, #cover-container-skole, #cover-text, #cover-text-skole, #help-text').toggleClass('noscroll');
	});

	// initial
	$(document).ready(function(){
		$('#cover-text').load('../start.html');
	});

	$(document).ready(function(){
		$('#cover-text-skole').load('../undervisningsopplegg.html');
	});

	// initial
	$(document).ready(function(){
		$('.cover-text_eng').load('../start_eng.html');
	});

	// handle menu clicks
	$('.site-nav a').click(function() {
		var page = $(this).attr('href');
		$('#cover-text').load('../' + page);
		window.location.hash = page;
		return false;
	});

	$(document).ready(function() { 
		if (window.location.hash) { 
			$('#cover-text').load(window.location.hash.substring(1))
		}
	});

/*	$("nav").delegate("a", "click", function() {
        _link = $(this).attr("href");
        history.pushState(null, null, _link);
		loadContent(_link);
        return false;
    });*/

/*	function loadContent(href){
        $mainContent
            $('#cover-text').fadeOut(200, function(){
                $('#cover-text').load(href + "#cover-text", function(){
					 $('#cover-text').fadeIn(200);
                });
			});
    }*/

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

	/*if (window.innerWidth > 630) {
	// handle menu clicks
	$('.site-nav a').click(function() {
		var page = $(this).attr('href');
		$('#cover-text').load('../' + page + '.html');
		$('#cover-text').animate({scrollTop:$(this).position(65)}, 'fast');
		return false;
	});
	};*/


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
