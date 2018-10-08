export class Weather {
    name: string;
    dt: Date | number;
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
        spead: number;
        deg: string;
    };
}
