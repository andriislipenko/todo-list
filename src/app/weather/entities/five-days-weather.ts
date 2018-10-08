export class FiveDaysWeather {
    city: {
        id: number,
        name: string
    };
    cnt: number;
    list: {
        dt: Date | number,
        main: {
            temp: number
        },
        weather: {
            main: string
        }[]
    }[];
}
