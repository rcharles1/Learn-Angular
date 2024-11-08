export interface Condition {
    text: string;
    icon: string;
    code: number;
  }
  
  export interface HourlyWeather {
    time_epoch: number;
    time: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    snow_cm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    vis_km: number;
    vis_miles: number;
    gust_mph: number;
    gust_kph: number;
    uv: number;
    hourFormat?: string;
  }
  
  export interface ForecastDay {
    date: string;
    hour: HourlyWeather[];
  }
  
  export interface WeatherData {
    forecast: {
      forecastday: ForecastDay[];
    };
    current?: {
      is_day: number;
      condition: Condition;
      last_updated: string;
    };
  }