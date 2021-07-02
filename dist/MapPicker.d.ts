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
declare type Props = {
    apiKey: string;
    defaultLocation: Location;
    zoom?: number;
    onChangeLocation?(lat: number, lng: number): void;
    onChangeZoom?(zoom: number): void;
    style?: any;
    className?: string;
    mapTypeId?: MapTypeId;
};
declare const MapPicker: FC<Props>;
export default MapPicker;
