import React, { useState } from 'react'

import MapPicker from 'react-google-map-picker'
import 'react-google-map-picker/dist/index.css'

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
  <MapPicker defaultLocation={{lat: lat, lng: lng}} onChange={handleChangeLocation} apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'/>
  </>
  );
}

export default App
