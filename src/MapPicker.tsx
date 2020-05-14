import React, { FC } from 'react';

function loadScript(src:string, id:string) {
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    (document.querySelector('head') as any).appendChild(script);

    return new Promise((resolve) => {
        script.onload = () => {
            resolve();
        };
    });
  }

type Props = {
    apiKey:string,
    defaultLocation:{lat:number,lng:number};
    onChange?(lat:number,lng:number):void;
}

function isValidLocation(lat:number, lng:number){
    return Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
}

const MapPicker:FC<Props> = ({apiKey, defaultLocation, onChange}) => {
    const loaded = React.useRef(false);
    let marker = React.useRef<any>(null);

    function handleChangeLocation(){
        if(onChange){
            var currentLocation = marker.current.getPosition();
            onChange(currentLocation.lat(), currentLocation.lng());
        }
    }

    function loadMap(){
        const Google = (window as any).google;

        const map = new Google.maps.Map(document.getElementById('google-map-view'), 
            { 
                center: isValidLocation(defaultLocation.lat, defaultLocation.lng) ? defaultLocation : { lat: 0, lng: 0},
                zoom: 5 
            });

            Google.maps.event.addListener(map, 'click', function(event:any) {                
                var clickedLocation = event.latLng;
                if(!marker.current){
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

    React.useEffect(() => {
        if (!loaded.current) {
            loadScript(
                'https://maps.googleapis.com/maps/api/js?libraries=places&key=' + apiKey,
                'google-maps',
              )
              .then(loadMap);
            loaded.current = true;
        }

    },[])  // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <div>
        <div id="google-map-view" style={{width: '100%', height:'600px'}}></div>
      </div>
   );
};
export default MapPicker;