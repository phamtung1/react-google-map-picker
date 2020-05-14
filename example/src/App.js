import React, { useState } from 'react'

import MapPicker from 'react-google-map-picker'

const App = () => {
  const [lat, setLat] = useState(10);
  const [lng, setLng] = useState(20);

  function handleChangeLocation (lat, lng){
    setLat(lat);
    setLng(lng);
  }

  return (
    <>
  <label>Latitute:</label><input type='text' value={lat} disabled/>
  <label>Longitute:</label><input type='text' value={lng} disabled/>
  <MapPicker defaultLocation={{lat: lat, lng: lng}} onChange={handleChangeLocation} apiKey='[YOUR_GOOGLE_API_KEY]'/>
  </>
  );
}

export default App
