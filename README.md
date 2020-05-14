# react-google-map-picker

A simple google map location picker (latitute, longitute)

[![NPM](https://img.shields.io/npm/v/react-google-map-picker.svg)](https://www.npmjs.com/package/react-google-map-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-google-map-picker
```
## Demo

[DEMO](https://phamtung1.github.io/react-google-map-picker/)

## Usage

```jsx
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
  <MapPicker defaultLocation={{lat: lat, lng: lng}} 
    style={{height:'700px'}}
    onChange={handleChangeLocation} 
    apiKey='[YOUR_GOOGLE_API_KEY]'/>
  </>
  );
}

export default App


```

## License

MIT © [phamtung1](https://github.com/phamtung1)