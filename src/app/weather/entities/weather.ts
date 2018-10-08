export class Weather {
    name: string;
    dt: number;
    id: number;
    main: {
        temp: number,
        pressure: number
    };
    weather: {
        main: string,
        description: string,
        icon: string
    }[];
    wind: {
        speed: number;
        deg: string;
    };
}
