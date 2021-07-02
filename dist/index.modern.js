import React from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function isGoogleMapScriptLoaded(id) {
  var scripts = document.head.getElementsByTagName('script');

  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].getAttribute('id') === id) {
      return true;
    }
  }

  return false;
}

function loadScript(src, id) {
  if (isGoogleMapScriptLoaded(id)) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, 500);
    });
  }

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

var MapTypeId;

(function (MapTypeId) {
  MapTypeId["Roadmap"] = "roadmap";
  MapTypeId["Satellite"] = "satellite";
  MapTypeId["Hybrid"] = "hybrid";
  MapTypeId["Terrain"] = "terrain";
})(MapTypeId || (MapTypeId = {}));

function isValidLocation(location) {
  return location && Math.abs(location.lat) <= 90 && Math.abs(location.lng) <= 180;
}

var GOOGLE_SCRIPT_URL = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=';

var MapPicker = function MapPicker(_ref) {
  var apiKey = _ref.apiKey,
      defaultLocation = _ref.defaultLocation,
      _ref$zoom = _ref.zoom,
      zoom = _ref$zoom === void 0 ? 7 : _ref$zoom,
      onChangeLocation = _ref.onChangeLocation,
      onChangeZoom = _ref.onChangeZoom,
      style = _ref.style,
      className = _ref.className,
      mapTypeId = _ref.mapTypeId;
  var MAP_VIEW_ID = 'google-map-view-' + Math.random().toString(36).substr(2, 9);
  var map = React.useRef(null);
  var marker = React.useRef(null);

  function handleChangeLocation() {
    if (onChangeLocation) {
      var currentLocation = marker.current.getPosition();
      onChangeLocation(currentLocation.lat(), currentLocation.lng());
    }
  }

  function handleChangeZoom() {
    onChangeZoom && onChangeZoom(map.current.getZoom());
  }

  function loadMap() {
    var Google = window.google;
    var validLocation = isValidLocation(defaultLocation) ? defaultLocation : {
      lat: 0,
      lng: 0
    };
    map.current = new Google.maps.Map(document.getElementById(MAP_VIEW_ID), _extends({
      center: validLocation,
      zoom: zoom
    }, mapTypeId && {
      mapTypeId: mapTypeId
    }));

    if (!marker.current) {
      marker.current = new Google.maps.Marker({
        position: validLocation,
        map: map.current,
        draggable: true
      });
      Google.maps.event.addListener(marker.current, 'dragend', handleChangeLocation);
    } else {
      marker.current.setPosition(validLocation);
    }

    map.current.addListener('click', function (event) {
      var clickedLocation = event.latLng;
      marker.current.setPosition(clickedLocation);
      handleChangeLocation();
    });
    map.current.addListener('zoom_changed', handleChangeZoom);
  }

  React.useEffect(function () {
    loadScript(GOOGLE_SCRIPT_URL + apiKey, 'google-maps-' + apiKey).then(loadMap);
  }, []);
  React.useEffect(function () {
    if (marker.current) {
      map.current.setCenter(defaultLocation);
      marker.current.setPosition(defaultLocation);
    }
  }, [defaultLocation]);
  React.useEffect(function () {
    if (map.current) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);
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

export default MapPicker;
//# sourceMappingURL=index.modern.js.map
