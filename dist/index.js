function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

function loadScript(src, id) {
  var script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  document.querySelector('head').appendChild(script);
  return new Promise(function (resolve) {
    script.onload = function () {
      resolve();
    };
  });
}

function isValidLocation(lat, lng) {
  return Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
}

var MapPicker = function MapPicker(_ref) {
  var apiKey = _ref.apiKey,
      defaultLocation = _ref.defaultLocation,
      onChange = _ref.onChange;
  var loaded = React.useRef(false);
  var marker = React.useRef(null);

  function handleChangeLocation() {
    if (onChange) {
      var currentLocation = marker.current.getPosition();
      onChange(currentLocation.lat(), currentLocation.lng());
    }
  }

  function loadMap() {
    var Google = window.google;
    var map = new Google.maps.Map(document.getElementById('google-map-view'), {
      center: isValidLocation(defaultLocation.lat, defaultLocation.lng) ? defaultLocation : {
        lat: 0,
        lng: 0
      },
      zoom: 5
    });
    Google.maps.event.addListener(map, 'click', function (event) {
      var clickedLocation = event.latLng;

      if (!marker.current) {
        marker.current = new Google.maps.Marker({
          position: clickedLocation,
          map: map,
          draggable: true
        });
        Google.maps.event.addListener(marker.current, 'dragend', handleChangeLocation);
      } else {
        marker.current.setPosition(clickedLocation);
      }

      handleChangeLocation();
    });
  }

  React.useEffect(function () {
    if (!loaded.current) {
      loadScript('https://maps.googleapis.com/maps/api/js?libraries=places&key=' + apiKey, 'google-maps').then(loadMap);
      loaded.current = true;
    }
  }, []);
  return React.createElement("div", null, React.createElement("div", {
    id: "google-map-view",
    style: {
      width: '100%',
      height: '600px'
    }
  }));
};

module.exports = MapPicker;
//# sourceMappingURL=index.js.map
