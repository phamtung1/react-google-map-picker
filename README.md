# react-google-map-picker

A simple google map location picker (latitute, longitute)

[![NPM](https://img.shields.io/npm/v/react-google-map-picker.svg)](https://www.npmjs.com/package/react-google-map-picker) 
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![abc](https://img.shields.io/badge/react-17-blue)](https://reactjs.org/blog/2020/10/20/react-v17.html)

## Install

```bash
npm install --save react-google-map-picker
```

React 16: version <=1.1.1

React 17: version 1.2.0
## Demo

[DEMO](https://phamtung1.github.io/react-google-map-picker/)

## Usage

```jsx
import React, { useState } from 'react'

import MapPicker from 'react-google-map-picker'

const DefaultLocation = { lat: 10, lng: 106};
const DefaultZoom = 10;

const App = () => {

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation (lat, lng){
    setLocation({lat:lat, lng:lng});
  }
  
  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }

  function handleResetLocation(){
    setDefaultLocation({ ... DefaultLocation});
    setZoom(DefaultZoom);
  }

  return (
    <>
  <button onClick={handleResetLocation}>Reset Location</button>
  <label>Latitute:</label><input type='text' value={location.lat} disabled/>
  <label>Longitute:</label><input type='text' value={location.lng} disabled/>
  <label>Zoom:</label><input type='text' value={zoom} disabled/>
  
  <MapPicker defaultLocation={defaultLocation}
    zoom={zoom}
    mapTypeId="roadmap"
    style={{height:'700px'}}
    onChangeLocation={handleChangeLocation} 
    onChangeZoom={handleChangeZoom}
    apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'/>
  </>
  );
}

export default App

```
### New property (thanks to @nikolicstjepan)

- mapTypeId: roadmap, satellite, hybrid, terrain



## Development

### Install packages
#### ```yarn install```

### Build

#### ```yarn build```

### Publishing to npm
#### ```yarn publish```
This builds commonjs and es versions of your module to dist/ and then publishes your module to npm.

Make sure that any npm modules you want as peer dependencies are properly marked as peerDependencies in package.json. The rollup config will automatically recognize them as peers and not try to bundle them in your module.

### Deploying to Github Pages
### ```yarn deploy```
This creates a production build of the example create-react-app that showcases your library and then runs gh-pages to deploy the resulting bundle.

## Contributors
A special thanks to:

[![](https://avatars.githubusercontent.com/u/28703604?v=4&size=50)](https://github.com/nikolicstjepan)

## License

MIT © [phamtung1](https://github.com/phamtung1)