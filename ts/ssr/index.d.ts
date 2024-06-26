import { type WompoComponent, type WompoProps } from '../wompo.js';
export declare const ssr: (Component: WompoComponent, props: WompoProps) => {
    html: string;
    css: {
        [key: string]: string;
    };
    props: {
        [key: string]: WompoProps[];
    };
};
