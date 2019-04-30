$(function() {

    var newHash      = "",
        $mainContent = $("#main-content"),
        baseHeight   = 0,
        $el;
    /*
        $("nav").delegate("a", "click", function() {
            window.location.hash = $(this).attr("href");
            return false;
        });

        $(window).bind('hashchange', function(){

        newHash = window.location.hash.substring(1);
        
        if (newHash) {
            $mainContent
            $('#cover-text').fadeOut(200, function() {
                $('#cover-text').load(newHash + " #cover-text", function() {
                    $('#cover-text').fadeIn(200)
                    });
                });
        };
        
    });
    
    $(window).trigger('hashchange');

    $(document).ready(function() { 
		if (window.location.hash) { 
			loadContent(window.location.hash)
		}
	});*/


    $("nav").delegate("a", "click", function() {
        _link = $(this).attr("href");
        history.pushState(null, null, _link);
        loadContent(_link)
        return false;
    });


    function loadContent(href){
        $mainContent
                    $('#cover-text').fadeOut(200, function(){
                        $('#cover-text').load(href + "#cover-text", function(){
                            $('#cover-text').fadeIn(200);
                        });
                });
    }
    
    $(window).bind('popstate', function(){
       _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
       loadContent(_link);
    });
    
});

$(document).ready(function() { 
    if (window.location.hash) { 
        $('#cover-text').load(window.location.hash)
    }
});