import { FC } from 'react';
declare type Props = {
    apiKey: string;
    defaultLocation: {
        lat: number;
        lng: number;
    };
    onChange?(lat: number, lng: number): void;
    style?: any;
    className?: string;
};
declare const MapPicker: FC<Props>;
export default MapPicker;
