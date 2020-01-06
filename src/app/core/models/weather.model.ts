export class Weather {
    city_name: string;
    lon: string;
    timezone: string;
    lat: string;
    country_code: string;
    state_code: string;
    data: weatherData[];
}

export class weatherData {
    moonrise_ts: string;
    wind_cdir: string;
    rh: Number;
    pres: Number;
    high_temp: Number;
    sunset_ts: string;
    wind_gust_spd: Number;
    sunrise_ts: string;
    dewpt: Number;
    uv: Number;
    weather: {
        icon: string,
        code: Number,
        description: String
    };
    max_temp: Number;
    low_temp: Number;
    temp: Number;
    datetime: string;
}
