import { FC } from 'react';
declare type Location = {
    lat: number;
    lng: number;
};
declare enum MapTypeId {
    Roadmap = "roadmap",
    Satellite = "satellite",
    Hybrid = "hybrid",
    Terrain = "terrain"
}
declare enum GestureHandling {
    Greedy = "greedy"
}
declare enum DisableDoubleClickZoom {
    True = "true",
    False = "false"
}
declare enum ZoomControl {
    True = "true",
    False = "false"
}
declare enum ScaleControl {
    True = "true",
    False = "false"
}
declare enum FullScreenControl {
    True = "true",
    False = "false"
}
declare type Props = {
    apiKey: string;
    defaultLocation: Location;
    zoom?: number;
    onChangeLocation?(lat: number, lng: number): void;
    onChangeZoom?(zoom: number): void;
    style?: any;
    className?: string;
    mapTypeId?: MapTypeId;
    gestureHandling?: GestureHandling;
    disableDoubleClickZoom?: DisableDoubleClickZoom;
    zoomControl?: ZoomControl;
    scaleControl?: ScaleControl;
    fullScreenControl?: FullScreenControl;
};
declare const MapPicker: FC<Props>;
export default MapPicker;
