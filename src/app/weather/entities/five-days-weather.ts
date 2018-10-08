import { FiveDaysWeatherListItem } from './five-days-weather-list-item';

export class FiveDaysWeather {
    city: {
        id: number,
        name: string
    };
    cnt: number;
    list: FiveDaysWeatherListItem[];
}
