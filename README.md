# Linear Timeseries Forecaster

`linear-timeseries-forecaster` is package forecasting future values in a timeseries dataset using linear extrapolation. It supports both average and median-based forecasting.

## Installation

```bash
npm install linear-timeseries-forecaster
```

## Usage

### Importing the Forecaster

```typescript
import { Forecaster } from 'linear-timeseries-forecaster';
import { DataRecord, ForecastMode } from 'linear-timeseries-forecaster/types';
```

### Creating a Forecaster from Data

```typescript
const data: DataRecord[] = [
    { date: new Date('2024-07-01'), value: 100 },
    { date: new Date('2024-07-02'), value: 110 },
    { date: new Date('2024-07-03'), value: 120 },
];

const options = { mode: ForecastMode.Average };

const forecaster = Forecaster.fromData(data, options);
```

### Forecasting Future Values

```typescript
const futureDate = new Date('2024-07-10');
const forecastedValue = forecaster.forecast(futureDate);
console.log(`Forecasted value for ${futureDate}: ${forecastedValue}`);
```

### Using Median Mode

```typescript
const options = { mode: ForecastMode.Median, median_count: 3 };

const forecaster = Forecaster.fromData(data, options);
const forecastedValue = forecaster.forecast(futureDate);
console.log(`Forecasted value for ${futureDate} using median: ${forecastedValue}`);
```

### Serializing and Deserializing Forecaster

```typescript
const magic = forecaster.toMagic();
const restoredForecaster = Forecaster.fromMagic(magic);
```

## License

MIT