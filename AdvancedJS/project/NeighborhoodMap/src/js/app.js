var markers = [];
let map;

function initMap() {
  // Initialize first location for map
  map = new google.maps.Map(
    document.getElementById('map'), 
    {center: {lat: -34.397, lng: 150.644}, zoom: 12}
  );

  // Initialize place list for recomendation
  // TODO: Use some API for recommendabel locations.
  let locations = [
    {title: 'hoge1', location: {lat: -34.397, lng: 150.644}},
    {title: 'hoge2', location: {lat: -34.387, lng: 150.544}},
    {title: 'hoge3', location: {lat: -33.397, lng: 150.644}},
    {title: 'hoge4', location: {lat: -33.397, lng: 149.644}},
  ]

  let largeInfoWindow = new google.maps.InfoWindow();
  let bounds = new google.maps.LatLngBounds();

  for (let i = 0; i < locations.length; i++){
    let position = locations[i].location;
    let title = locations[i].title;
    let marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });

    markers.push(marker);
    marker.addListener('click', function(){
      populateInfoWindow(this, largeInfoWindow);
    });
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick',function(){
      infowindow.setMarker = null;
    });
  }
}

// ko.applyBindings(new ClickCounterViewModel());