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

var MAP_VIEW_ID = 'google-map-view-' + Math.random().toString(36).substr(2, 9);

var MapPicker = function MapPicker(_ref) {
  var apiKey = _ref.apiKey,
      defaultLocation = _ref.defaultLocation,
      onChange = _ref.onChange,
      style = _ref.style,
      className = _ref.className;
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
    var map = new Google.maps.Map(document.getElementById(MAP_VIEW_ID), {
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
  var componentStyle = Object.assign({
    width: '100%',
    height: '600px'
  }, style || {});
  return React.createElement("div", {
    id: MAP_VIEW_ID,
    style: componentStyle,
    className: className
  });
};

module.exports = MapPicker;
//# sourceMappingURL=index.js.map
