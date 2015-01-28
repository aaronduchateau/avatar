window.g = {
	windowHeight: function(){
		return $( window ).height();
	},
	adjustedWindowHeight: function(){
		return $( window ).height() - 100;
	},
	windowWidth: function(){
		return $( window ).width();
	},
	oneQuarterWidth: function(){
		console.log(this.windowWidth());
		return this.windowWidth() / 4;
	},
	halfWidth: function(){
		return this.oneQuarterWidth() + this.oneQuarterWidth();
	},
	windowLargeWidth: function(){
		return this.windowWidth() + this.oneQuarterWidth();
	},
	triPageSetup: function(){

		var windowHeight = this.windowHeight();
		var adjustedWindowHeight = this.adjustedWindowHeight();
		var windowWidth = this.windowWidth();
		var oneQuarterWidth = this.oneQuarterWidth();
		var halfWidth = this.halfWidth();
		var windowLargeWidth = this.windowLargeWidth();

		$("#body-dash").css("overflow-x", "hidden"); 
	    $(".container-dash").css('min-width', windowLargeWidth + 'px');
	    $(".container-dash").css('position','absolute');
	    $(".container-dash").css('top', '98px');
	    $(".container-dash").css('left', '-' + oneQuarterWidth + 'px');

	    $(".options-area").css("width", windowWidth + "px");
	    $(".options-area").css('position','absolute');
	    $(".options-area").css('top', '60px');

	    $(".dash-left-list").css("width", halfWidth + "px");
	    $(".dash-center").css("width", halfWidth + "px");
	    $(".dash-right-list").css("width", oneQuarterWidth + "px");
	    $(".dash-options").css("width", oneQuarterWidth + "px");

	    $(".dash-left-inter-margin").css("margin-left", oneQuarterWidth + "px");

	    $(".dash-left-list").css("height", adjustedWindowHeight + "px");
	    $(".dash-center").css("height", adjustedWindowHeight + "px");
	    $(".dash-right-list").css("height", adjustedWindowHeight + "px");

	    //absolute positioning for elements
	    $(".dash-left-list").css("position", "absolute");
	    $(".dash-left-list").css("top", "0px");
	    $(".dash-left-list").css("left", "0px");

	    $(".dash-center").css("position", "absolute");
	    $(".dash-center").css("top", "0px");
	    $(".dash-center").css("left", halfWidth + "px");

	    $(".dash-right-list").css("position", "absolute");
	    $(".dash-right-list").css("top", "0px");
	    $(".dash-right-list").css("left", windowWidth + "px");

	    $(".dash-options").css("position", "absolute");
	    $(".dash-options").css("top", "0px");
	    $(".dash-options").css("left", windowWidth + oneQuarterWidth + "px");

	    //set width for header
	    $('.left-action-buttons').css("width", halfWidth + "px");

	},
	populateTopMenu: function(menuJson){
		$("#global-template-holder").load( "../assets/jsTemplates/globalTemplate.html", function() {
    		var source = $("#top-menu").html();
      		var topMenuTemplate = Handlebars.compile(source);
      		var templateResult = topMenuTemplate(menuJson);
      		$('#body-dash').prepend(templateResult);
      		window.g.generalLoaderHtml = $("#general-loader").html();
    	});
	}
}	

