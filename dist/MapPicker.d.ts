import { FC } from 'react';
declare type Props = {
    apiKey: string;
    defaultLocation: {
        lat: number;
        lng: number;
    };
    onChange?(lat: number, lng: number): void;
};
declare const MapPicker: FC<Props>;
export default MapPicker;
