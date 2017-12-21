class RecommendablePlace{
  /**
   * Data class for this application
   * @param {Number} index 
   * @param {String} id 
   * @param {String} title 
   * @param {Array} formattedAddress 
   * @param {String} formattedPhone 
   * @param {Array} tips 
   * @param {Array} categories
   * @param {Object} location 
   */

   constructor(index, id, title, formattedAddress, formattedPhone, tips, categories, location){
    this.index = index;
    this.id = id;
    this.title = title;
    this.formattedAddress = formattedAddress;
    this.formattedPhone = formattedPhone;
    this.tips = tips;
    this.category = categories;
    this.location = location;
  }
}

class FourSquareSettings{
  /**
   * Class for handling something related to Foursquare stuff
   */

  /**
   * Return API endpoint URL for requested lat,lng combination.
   * @param {Number} lat 
   * @param {Number} lng 
   */
  getSearchEndpointURL(lat, lng){
    return `https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&limit=15&client_id=JXEWEERS5WEIEZE2XBMY2OBVBTH0MMD2BEESEMTZG22M4ZMD&client_secret=WKR2HGCHNFJQFVBOCJLNMOIZWCLFZO2J5QVOAN1CMBYQPUBU&v=20170111`;
  }

  getRecommendEndpointURL(lat, lng){
    return `https://api.foursquare.com/v2/venues/explore?ll=${lat},${lng}&limit=15&client_id=JXEWEERS5WEIEZE2XBMY2OBVBTH0MMD2BEESEMTZG22M4ZMD&client_secret=WKR2HGCHNFJQFVBOCJLNMOIZWCLFZO2J5QVOAN1CMBYQPUBU&v=20170111`;
  }

  /**
   * Return API endpoint URL for place photos.
   * @param {String} placeID 
   */
  getPhotoEndpointURL(placeID){
    return `https://api.foursquare.com/v2/venues/${placeID}/photos?client_id=JXEWEERS5WEIEZE2XBMY2OBVBTH0MMD2BEESEMTZG22M4ZMD&client_secret=WKR2HGCHNFJQFVBOCJLNMOIZWCLFZO2J5QVOAN1CMBYQPUBU&v=20171217`;
  }

  /**
   * Return API endpoint URL for place tips
   * @param {String} placeID 
   */
  getTipsEndpointURL(placeID){
    return `https://api.foursquare.com/v2/venues/${placeID}/tips?client_id=JXEWEERS5WEIEZE2XBMY2OBVBTH0MMD2BEESEMTZG22M4ZMD&client_secret=WKR2HGCHNFJQFVBOCJLNMOIZWCLFZO2J5QVOAN1CMBYQPUBU&v=20171217`;
  }

  getRecommendablePlaces(lat, lng){
    return fetch(foursquare.getRecommendEndpointURL(lat, lng))
    .catch(err => {
      // this will fire when cors error/network error/etc... happened
      window.alert('There is network probelm. Please try again.');
      // throw new Error('Something goes wrong with internet access. Please retry later')
      return [];
    })
    .then(res => {
      return res.json();
    })
    .then(recommends => {
      return recommends.response.groups[0].items;
    })
  }

  /**
   * Return image src URL from place ID.
   * @param {String} placeID 
   */
  getImgSrc(placeID){
    return fetch(foursquare.getPhotoEndpointURL(placeID))
    .catch(err => {
      // this will fire when cors error/network error/etc... happened
      console.log('CLIENT-ERR :', err);
      // throw new Error('Something goes wrong with internet access. Please retry later')
      return '../img/no-image.jpg'
    })
    .then(res => {
      // extract response from foursquare as json
      return res.json()
    })
    .then(locationPhotos => {
      if(locationPhotos.response.photos.count === 0){
        // console.log('There is no image can get.');
        return '../img/no-image.jpg'
      } else {
        let index = Math.floor(Math.random() * locationPhotos.response.photos.count);
        let prefix = locationPhotos.response.photos.items[index].prefix;
        let suffix = locationPhotos.response.photos.items[index].suffix;
        // console.log(prefix + '900x400' + suffix);
        return prefix + `900x400` + suffix;
      }
    });
  }

  /**
   * Return location tips
   * @param {String} placeID 
   */
  getLocationTips(placeID){
    return fetch(foursquare.getTipsEndpointURL(placeID))
    .catch(err => {
      // this will fire when cors error/network error/etc... happened
      console.log('CLIENT-ERR :', err);
      // throw new Error('Something goes wrong with internet access. Please retry later')
      return 'Could not get any tips due to network condition...';
    })
    .then(res => {
      // extract response from foursquare as json
      return res.json();
    })
    .then(locationTips => {
      return locationTips.response.tips;
    });
  }
}

// ViewModel of knockout js.
// This is used to bind data with html.
const ViewModel = function() {
  const self = this;
  // wonder these should be observale.
  this.markers = ko.observableArray();
  this.placeMarkers = ko.observableArray();
  this.largeInfoWindows = ko.observableArray();
  this.locations = ko.observableArray();

  // variables binded to html
  // search query
  this.query = ko.observable('');
  // zoom to area text
  this.zoomAreaText = ko.observable('');
  // image source url which showed in place detail
  this.srcURL = ko.observable('../img/no-image.jpg');
  // place name which showed in place detail
  this.placeName = ko.observable('Name: No Place Name');
  // place contact which showed in place detail
  this.contact = ko.observable('Contact: No contact');
  // place address which showed in place detail
  this.address = ko.observable('Adress: No address');
  // place top review which showed in place detail
  this.topReview = ko.observable('Review: No review');
  // place reviews which showed in left side html
  this.reviews = ko.observableArray();
  
  /**
   * handle DOM about recommendable place info in html
   * @param {RecommendablePlace} placeObj 
   */
  this.showInfo = function(placeObj){
    // TODO: add active class when it's clicked.
    // activateHTMLClass(placeObj.index);
    foursquare.getImgSrc(placeObj.id)
    .then(imgSrc => {
      self.srcURL(imgSrc);
      self.placeName('Name: ' + placeObj.title);
      if (placeObj.formattedPhone){
        self.contact('Contact: ' + placeObj.formattedPhone);
      }
      if (placeObj.formattedAddress){
        self.address('Address: ' + placeObj.formattedAddress);
      }
      if (placeObj.tips){
        self.topReview('Review: ' + placeObj.tips[0].text);
      }
      return true
    })
    .then(success => {return foursquare.getLocationTips(placeObj.id);})
    .then(res => {
      self.reviews(res.items);
      return true;
    })
    .then(res => {
      populateInfoWindow(self.markers()[placeObj.index], self.largeInfoWindows()[placeObj.index]);
    })
  };

  /**
   * Return serch query results
   */
  this.searchResults = ko.computed(function() {
    let q = self.query();
    return self.locations().filter((recommendablePlace, index) => {
      if (recommendablePlace.title.toLowerCase().indexOf(q) >= 0){
        showMarker(index);
        return true;
      }else{
        hideMarker(index);
        return false;
      }
    });
  });

  /**
   * Call zoomToArea function
   */
  this.callZoomToArea = function() {
    zoomToArea();
  }
};

// create viewModel instance
const vm = new ViewModel();
// bind vm to html
ko.applyBindings(vm);

let map;

// Foursquare stuff instance
const foursquare = new FourSquareSettings();

function initMap(lat=40.7413549, lng=-73.9980244) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: lat, lng: lng },
    zoom: 13,
    mapTypeControl: false
  });

  foursquare.getRecommendablePlaces(lat, lng)
  .then(recommendedList => {
    
    // initialize RecommendablePlace list
    let index = 0;
    recommendedList.forEach(function(element) {
      vm.locations.push(
        new RecommendablePlace(
          index, 
          element.venue.id, 
          element.venue.name, 
          element.venue.location.formattedAddress,
          element.venue.contact.formattedPhone,
          element.tips,
          element.venue.categories,
          element.venue.location
        )
      );
      index++;
    });

    // This autocomplete is for use in the geocoder entry box.
    const zoomAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('zoom-to-area-text')
    );

    // Bias the boundaries within the map for the zoom to area text.
    zoomAutocomplete.bindTo('bounds', map);

    const largeInfowindow = new google.maps.InfoWindow();

    // Style the markers a bit. This will be our listing marker icon.
    const defaultIcon = makeMarkerIcon('0091ff');

    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    const highlightedIcon = makeMarkerIcon('FFFF24');

    // The following group uses the location array to create an array of markers on initialize.
    for (let i = 0; i < vm.locations().length; i++) {
      // Get the position from the location array.
      const position = vm.locations()[i].location;
      const title = vm.locations()[i].title;
      // Create a marker per location, and put into markers array.
      const marker = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: i
      });
      // Push the marker to our array of markers.
      vm.markers().push(marker);
      vm.largeInfoWindows().push(largeInfowindow);
      // Create an onclick event to open the large infowindow at each marker.
      marker.addListener('click', function () {
        // TODO: add active class when it's clicked.
        // activateHTMLClass(i);
        populateInfoWindow(this, largeInfowindow);
        vm.showInfo(vm.locations()[i]);
      });
      // Two event listeners - one for mouseover, one for mouseout,
      // to change the colors back and forth.
      marker.addListener('mouseover', function () {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function () {
        this.setIcon(defaultIcon);
      });
    }

    if (vm.locations().length !==0){
      vm.showInfo(vm.locations()[0]);
    }

    // Show markers by default.
    const bounds = new google.maps.LatLngBounds();

    // Extend the boundaries of the map for each marker and display the marker
    for (let i = 0; i < vm.markers().length; i++) {
      vm.markers()[i].setMap(map);
      bounds.extend(vm.markers()[i].position);
    }

    map.fitBounds(bounds);
  })
  .catch(err => console.log(err));
}

// Error handler for google map API
function mapError() {
  window.alert('Failed to load map. Please try again later.');
};

/**
 * This function populates the infowindow when the marker is clicked. We'll only allow
 * one infowindow which will open at the marker that is clicked, and populate based
 * on that markers position.
 * @param {google.maps.Marker} marker 
 * @param {google.maps.Marker} infowindow 
 */
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    // Clear the infowindow content to give the streetview time to load.
    infowindow.setContent('');
    if (infowindow.marker){
      infowindow.marker.setAnimation(null);
    }
    marker.setAnimation(google.maps.Animation.BOUNCE);
    infowindow.marker = marker;
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function () {
      infowindow.marker = null;
    });
    const streetViewService = new google.maps.StreetViewService();
    const radius = 50;
    // In case the status is OK, which means the pano was found, compute the
    // position of the streetview image, then calculate the heading, then get a
    // panorama from that and set the options
    function getStreetView(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        const nearStreetViewLocation = data.location.latLng;
        const heading = google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation, marker.position);
        infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
        const panoramaOptions = {
          position: nearStreetViewLocation,
          pov: {
            heading: heading,
            pitch: 30
          }
        };
        const panorama = new google.maps.StreetViewPanorama(
          document.getElementById('pano'), panoramaOptions);
      } else {
        infowindow.setContent('<div>' + marker.title + '</div>' +
          '<div>No Street View Found</div>');
      }
    }
    // Use streetview service to get the closest streetview image within
    // 50 meters of the markers position
    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    // Open the infowindow on the correct marker.
    infowindow.open(map, marker);
  }
}

/**
 * This function will show marker with designated index.
 * @param {Number} index 
 */
function showMarker(index) {
  if (vm.markers().length !== 0){
    vm.markers()[index].setMap(map);
  }
}

/**
 * This function will hide marker with designated index.
 * @param {Number} index 
 */
function hideMarker(index) {
  vm.markers()[index].setMap(null);
}

/**
 * This function takes in a COLOR, and then creates a new marker
 * icon of that color. The icon will be 21 px wide by 34 high, have an origin
 * of 0, 0 and be anchored at 10, 34).
 * @param {String} markerColor rgb value
 */
function makeMarkerIcon(markerColor) {
  const markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21, 34));
  return markerImage;
}

/**
 * This function takes the input value in the find nearby area text input
 * locates it, and then zooms into that area. This is so that the user can
 * show all listings, then decide to focus on one area of the map.
 */
function zoomToArea() {
  // Initialize the geocoder.
  const geocoder = new google.maps.Geocoder();
  // Get the address or place that the user entered.
  const address = vm.zoomAreaText();
  // Make sure the address isn't blank.
  if (address === '') {
    window.alert('You must enter an area, or address.');
  } else {
    // Geocode the address/area entered to get the center. Then, center the map
    // on it and zoom in
    geocoder.geocode(
      {
        address: address,
        // componentRestrictions: { locality: 'New York' }
      }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(15);
          vm.query('');
          vm.locations.removeAll();
          vm.markers.removeAll();
          vm.largeInfoWindows.removeAll();
          vm.placeMarkers.removeAll();
          initMap(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        } else {
          window.alert('We could not find that location - try entering a more' +
            ' specific place.');
        }
      });
  }
}

/**
 * activate clicked item
 * @param {Number} index 
 */
function activateHTMLClass(index){
  $('.list-group-item').removeClass('active');
  $(`.list-group-item:eq(${index})`).addClass('active');
}
