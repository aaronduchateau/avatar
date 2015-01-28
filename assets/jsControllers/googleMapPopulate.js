
var poly;
var map;
var marker;
var markers = [];
var initialMakerPoint;
var masterCount = 0;
var masterLatLng;
var infowindow = null;

var jsonMarkerHolder = [];

function add_markers(jsonItem) {
  console.log(jsonItem);
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<div class="ok_to_show">' +
      '<div id="bodyContent">'+ jsonItem.content +
      '</div>'+
      '</div>'+
      '</div>';

   infowindow = new google.maps.InfoWindow({
      content: contentString
  });
  var image = {
    url: 'img/rsz_piggy-bank.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
  };            

  var myLatlng = new google.maps.LatLng(jsonItem.lat,jsonItem.lng);
  var marker = new google.maps.Marker({
      position: myLatlng,
      data: contentString,
      //icon: image,
      map: map,
      title: 'Property Listing Data'
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
  hideLoader();
}

function showLoader(){
  $('#loader-div').css('right','50px');
}

function hideLoader(){
  $('#loader-div').css('right','-500px');
}

function initialize() {
  function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  setAllMap(null);
  markers= [];
  var jsonMarkerHolder = [];
  var rows = $("#data-table tr:gt(0)"); // skip the header row

  if (rows.length == 0){
      hideLoader();
      $('.num-result-holder').html("0");
    }

    rows.each(function(index) {

      var lat = $(this).find('.lat').html();
      var longr = $(this).find('.longr').html();
                  
      var p = $(this).find('.p').html();
      var lp = $(this).find('.lp').html();
      var dom = $(this).find('.dom').html();
      var dater = $(this).find('.dater').html();
      var st = $(this).find('.st').html();
      var et = $(this).find('.et').html();
      var olp = $(this).find('.olp').html();
      var link = $(this).find('.link').html();
      var li = $(this).find('.li').html();
      var os = $(this).find('.os').html();
      var iss = $(this).find('.iss').html();
      var la = $(this).find('.la').html();

      var popUpElement = '<b>Property: </b>' + p + '<br/><b>List Price: </b>' + lp + '<br/><b>Days on Market: </b>' + dom + '<br/><b>Date:</b>' + dater + '<br/><b>Start Time:</b>' + st + '<br/><b>End Time: </b>' + et + '<br/><b>Original List Price: </b>' + olp + '<br/><b>Link: </b>' + link + '<br/><b>Listing ID: </b>' + li + '<br/><b>Original Source: </b>' + os + '<br/><b>Is Short Sale: </b>' + iss + '<br/><b>Listing Agent: </b>' + la + '<br/><b>Longitude: </b>' + longr + '<br/><b>Latitude: </b>' + lat;
      //console.log(popUpElement);
      var obj = {};
      obj['lat'] = lat;
      obj['lng'] = longr;
      obj['content'] = popUpElement;
      jsonMarkerHolder.push(obj);
      //console.log(index + ' index');
      //console.log(rows.length + ' length');
      if((index + 1) == rows.length){
        readyToStart();
        $('.num-result-holder').html(rows.length);
      }
      //console.log("before");
    });

  console.log('#################initialized app#################');
  
  function readyToStart(){
  
    $.each(jsonMarkerHolder, function(i, item) {
      console.log(item);
      add_markers(item);
    });

  }

}


$(function() {

    var sh = $(window).height() - 15; 
    var sw = $("#content").width();
    $('#map-canvas').css('width',sw);
    $('#map-canvas').css('height',sh);
    $('#overflowTable').css('height',sh);
    $('#left-legend-table').css('height',sh);
    $('#overflowTable').css('overflow','scroll');
    $('#overflowTable').css('overflow-y','auto');
    var shDateAccounted = sh - 124;
    $('#broker-scroll').css('height',shDateAccounted * 0.5);
    $('#broker-scroll').css('overflow','scroll');
    $('#broker-scroll').css('overflow-y','auto');

    $('#agent-scroll').css('height',shDateAccounted * 0.5);
    $('#agent-scroll').css('overflow','scroll');
    $('#agent-scroll').css('overflow-y','auto');
    
    var mapOptions = {
      zoom: 10,
      center: new google.maps.LatLng(33.7442,-117.867)
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    //this guy adds all the location markers
    console.log("after***********************************************");
});
////////////////////////////////////////////////////////////////////////////////