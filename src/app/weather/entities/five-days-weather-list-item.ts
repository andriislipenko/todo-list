export class FiveDaysWeatherListItem {
    dt: Date | number;
    main: { temp: number };
    weather: { main: string }[];
}
