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
    style?:any;
    className?:string;
}

function isValidLocation(lat:number, lng:number){
    return Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
}

const MAP_VIEW_ID = 'google-map-view-' + Math.random().toString(36).substr(2, 9);

const MapPicker:FC<Props> = ({apiKey, defaultLocation, onChange, style,className}) => {
    
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
        const centerLocation = isValidLocation(defaultLocation.lat, defaultLocation.lng) ? defaultLocation : { lat: 0, lng: 0};
        const map = new Google.maps.Map(document.getElementById(MAP_VIEW_ID), 
            { 
                center: centerLocation,
                zoom: 5 
            });

            if(!marker.current){
                marker.current = new Google.maps.Marker({
                    position: centerLocation,
                    map: map,
                    draggable: true
                });
                Google.maps.event.addListener(marker.current, 'dragend', handleChangeLocation);
            } else {
                marker.current.setPosition(centerLocation);
            }

            Google.maps.event.addListener(map, 'click', function(event:any) {                
                var clickedLocation = event.latLng;
                marker.current.setPosition(clickedLocation);
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

    const componentStyle = Object.assign({width: '100%', height:'600px'}, style || {});

   return (
    <div id={MAP_VIEW_ID} style={componentStyle} className={className}></div>
   );
};
export default MapPicker;