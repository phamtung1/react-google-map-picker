import { FC } from 'react';
declare type Location = {
    lat: number;
    lng: number;
};
declare type Props = {
    apiKey: string;
    defaultLocation: Location;
    zoom?: number;
    onChangeLocation?(lat: number, lng: number): void;
    onChangeZoom?(zoom: number): void;
    style?: any;
    className?: string;
};
declare const MapPicker: FC<Props>;
export default MapPicker;
