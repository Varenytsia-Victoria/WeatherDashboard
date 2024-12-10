# Weather Dashboard

This is a simple weather application built with Angular that allows users to add cities and view their weather forecast. The app uses the OpenWeather API to fetch weather data for a given city.

## Features

- Add a city and see the weather forecast for that city.
- Display weather information such as temperature and weather condition.
- Stores the list of cities in `localStorage`, so the data persists between page reloads.

## Prerequisites

To run this application, you need the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [Angular CLI](https://angular.io/cli) (Install using `npm install -g @angular/cli`)
- An API key from [OpenWeather API](https://openweathermap.org/)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Varenytsia-Victoria/WeatherDashboard.git
cd weather-dashboard
```

### 2. Install dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Set up API key

To fetch weather data, the application uses the OpenWeather API. You will need to sign up on their [website](https://openweathermap.org/) and obtain an API key.

### 4. Serve the application

Now that everything is set up, you can run the application locally:

```bash
ng serve
```

This will start the development server and you can view the app by navigating to `http://localhost:4200/` in your browser.

## API Usage

The app uses the [OpenWeatherMap API](https://openweathermap.org/). To retrieve weather data, a GET request is made to the following endpoint:

```
https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={API_KEY}
```

- Replace `{cityName}` with the name of the city you want to fetch data for.
- Replace `{API_KEY}` with your OpenWeather API key.


