window.gmd = {
	populateMap : function (mapJson){
		var poly;
		var map;
		var marker;
		var markers = [];
		var initialMakerPoint;
		var masterCount = 0;
		var masterLatLng;
		var infowindow = null;

		var mapOptions = {
	      zoom: 11,
	      center: new google.maps.LatLng(33.7442,-117.867)
	    };

	    setTimeout(function(){
	    	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	    	populateMap();
	   
		    var hasLoadedOnce = false;
		    google.maps.event.addListener(map, 'idle', function() {
		    	if (!hasLoadedOnce){
		    		setTimeout(function(){
			    		$( ".dash-left-inter-margin" ).slideDown( "slow", function() {
						    	//google.maps.event.trigger(map, 'resize');
						    	$( ".dash-center" ).show();
						    	google.maps.event.trigger(map, 'resize');
						    	$( ".dash-right-inter-margin" ).slideDown( "slow", function() {
								    $( ".options-inter-margin" ).show();
								});
							
						});
		    		},300);
		    	}
		    	hasLoadedOnce = true;
			});
		},1300);

	    function populateMap(){
		    $.map(mapJson, function( jsonItem, i ) {
		    	//eventually remove this
		    	var price = jsonItem.ORIGINALLISTPRICE;
		    	price = price.toString();
		    	jsonItem.ORIGINALLISTPRICE = price.substring(0,2);
		    	jsonItem.TRACKER = i;
		    	
			    var source   = $("#map-info-template").html();
		        var leftDashTemplate = Handlebars.compile(source);
		        var contentString = leftDashTemplate(jsonItem);  


			    infowindow = new google.maps.InfoWindow({
			        content: contentString,
			    });
			  
			  	var image = {
			  		//url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
			  		//url: 'http://maps.google.com/mapfiles/kml/pal5/icon11.png'
			    	url: '../images/map-icon-2.png',
			    	// This marker is 20 pixels wide by 32 pixels tall.
			    	size: new google.maps.Size(32, 32),
			    	// The origin for this image is 0,0.
			    	//origin: new google.maps.Point(0,0),
			    	// The anchor for this image is the base of the flagpole at 0,32.
			    	//anchor: new google.maps.Point(0, 32)
			  	};            

			  	var myLatlng = new google.maps.LatLng(jsonItem.LATITUDE,jsonItem.LONGITUDE);
			  	var marker = new google.maps.Marker({
			      	position: myLatlng,
			      	data: contentString,
			      	//animation: google.maps.Animation.DROP,
			      	icon: image,
			      	map: map,
			      	title: 'Jobs Listed:'
			  	});

			  	markers.push(marker);
			  
			  	google.maps.event.addListener(marker, 'click', function(e) {
				    //infoWindow.setContent(data.content);
				    if (infowindow) {
				        infowindow.close();
				    }
				    console.log(marker);
				    
				    infowindow.open(map,marker);
				    infowindow.setContent(marker.data);
				   
				    var clickedLatLng = new google.maps.LatLng(this.position.lat(),this.position.lng());
				    
				    $('.not_ok_to_show').hide();
				    $('.ok_to_show').show();
			 	});
		      
		   
		      
		    });
		}
	}
};