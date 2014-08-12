// JavaScript Document

jQuery(document).ready(function() {


	/*global jQuery:false */
	/*jshint devel:true, laxcomma:true, smarttabs:true */
	"use strict";	   
    Menu();
	Toggle();
	Flexslider();
	CustomScrollbar();
    bxslider();  
	var offst = jQuery( '.logo' ).offset();
    jQuery( '.single-map-data-details' ).offset({ top: offst.top+180, left: offst.left+180});
 	 // store the viewport width in a variable
	var viewportWidth = jQuery('body').innerWidth();
	jQuery("a.lightbox").prettyPhoto({
    theme: 'pp_default',
    changepicturecallback: function(){
        // 1024px is presumed here to be the widest mobile device. Adjust at will.
        if (viewportWidth < 1025) {
            jQuery(".pp_pic_holder.pp_default").css("top",window.pageYOffset+"px");
        }
    }
});
                
   // Apply PrettyPhoto for video gallery and image gallery
 	jQuery("a[rel^='prettyPhoto']").prettyPhoto();
 	jQuery('a.print').printPreview();
	jQuery('#widget').draggable();
	jQuery(document).bind('keydown', function(e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 80 && !$('#print-modal').length) {
                    jQuery.printPreview.loadPrintPreview();
                    return false;
                }            
    });

});	

function Menu(){
  // menu 
    var current_width = jQuery(window).width();
    if(current_width > 979){
    	jQuery(window).bind('scroll', function() {
			if (jQuery(window).scrollTop() > 20) {
    			$('.navbar').addClass('menu-fixed');
        		jQuery('.logo').addClass('logo-resized');
  			} else {
    			jQuery('.navbar ').removeClass('menu-fixed');
    			jQuery('.logo').removeClass('logo-resized');
  			}
		});
    }

    jQuery(window).resize(function(){
      /*If browser resized, check width again */
    	var current_width = jQuery(window).width();
  	    	if(current_width < 979){
            	jQuery(window).bind('scroll', function() {
  					if (jQuery(window).scrollTop() > 10) {
    					jQuery('.navbar').removeClass('menu-fixed');
    				} 
				});
            }
      		if(current_width > 979){
       			jQuery(window).bind('scroll', function() {
  					if (jQuery(window).scrollTop() > 10) {
    					jQuery('.navbar').addClass('menu-fixed');
        				jQuery('.logo').addClass('logo-resized');
  					} else {
    					jQuery('.navbar').removeClass('menu-fixed');
    					jQuery('.logo').removeClass('logo-resized');
  					}
				});
    		}
  		});
	
   var middle = Math.ceil(jQuery("ul#main-nav").children('li').length / 2);
   jQuery("#main-nav li:nth-child(" + middle + ")").after(jQuery('<li><div class="logo"><a href="'+homeURL+'"><img alt="logo" src="'+logo+'"></a></div></li>'));
   jQuery('.sub-menu').addClass('dropdown-menu');
   jQuery('ul.sub-menu').parent().addClass('dropdown');
   jQuery('ul.sub-menu').parent().children('a').addClass('dropdown-toggle');
  
 } 
 function Toggle(){
	// Apply Toggle to change rent or buy option
 	 jQuery('.toggle').toggles({
		clicker:jQuery('.clickme')
	});
  	  if(jQuery('.toggle-inner .active').html() == 'FOR RENT')
	  {
		jQuery('#bath').after('<input type="hidden" name="property_status" id="property_status" value="rent">');
	}else{
		jQuery('#bath').after('<input type="hidden" name="property_status" id="property_status" value="buy">');
	}jQuery('.toggle').on("click",
	function(){
		jQuery('#property_status').remove();
    if(jQuery('.toggle-inner .active').html() == 'FOR RENT'){
			jQuery('#bath').after('<input type="hidden" name="property_status" id="property_status" value="rent">');
		}else{
			jQuery('#bath').after('<input type="hidden" name="property_status" id="property_status" value="buy">');
		}
	});
}

function Flexslider(){
	jQuery('.flexslider').flexslider({
		animation: "slide",
		controlNav: false,
		animationLoop: true,
		slideshow: true,
		directionNav: true,
		animationSpeed: 600
	});
}

function CustomScrollbar(){
	// custom scrollbar in home page new listings
  jQuery(".featured-properties").mCustomScrollbar({
		horizontalScroll:true,
		scrollInertia:600,
		autoDraggerLength:false,
		advanced:{
			autoExpandHorizontalScroll:true
		}
	});
}

function bxslider(){
	jQuery('.bxslider').bxSlider({
		pagerCustom: '#bx-pager',
		auto: true
	});
}jQuery('.search-gallery li,.featured-properties ul li').mouseenter(function(){
	var image= jQuery(this).find('img'),
	caption = jQuery(this).find('.details');
    caption.width(image.width());
    caption.height(image.height());
    caption.fadeIn();
}).mouseleave(function(){
	var image= jQuery(this).find('img'),
	caption = jQuery(this).find('.details');
    caption.width(image.width());
    caption.height(image.height());
    caption.fadeOut();
});