import { calculateAverage, calculateMedian } from "./helpers";
import { DataRecord, ForecastMode, ForecasterOptions, ForecasterMagic } from "./types";

export class Forecaster {
    private lastEntryTime: number;
    private lastEntryValue: number;
    private multiplier: number;

    private constructor(magic: ForecasterMagic) {
        this.lastEntryTime = magic.lastEntryTime;
        this.lastEntryValue = magic.lastEntryValue;
        this.multiplier = magic.multiplier;
    }

    public static fromMagic(magic: ForecasterMagic): Forecaster {
        return new Forecaster(magic);
    }

    public static fromData(data: DataRecord[], options: ForecasterOptions = { mode: ForecastMode.Average }): Forecaster {
        const formattedData = data.sort((a, b) => a.date.getTime() - b.date.getTime());
        const values = formattedData.map((entry, index) => {
            if (index === 0) return undefined;
            const prevEntry = formattedData[index - 1];
            const changeSinceLast = entry.value - prevEntry.value;
            const timeSinceLast = entry.date.getTime() - prevEntry.date.getTime();
            return changeSinceLast / timeSinceLast;
        }).filter(value => value !== undefined) as number[];

        if (values.length === 0) {
            throw new Error('Not enough data to perform calculations');
        }

        const lastEntry = formattedData[data.length - 1];
        const lastEntryTime = lastEntry.date.getTime();
        const lastEntryValue = lastEntry.value;

        let multiplier: number;

        switch (options.mode) {
            case ForecastMode.Average:
                multiplier = calculateAverage(values);
                break;
            case ForecastMode.Median:
                multiplier = calculateMedian(values, options.median_count || 1);
                break;
            default:
                throw new Error('Unsupported forecast mode');
        }

        return new Forecaster({
            lastEntryTime,
            lastEntryValue,
            multiplier,
        });
    }

    public toMagic(): ForecasterMagic {
        return {
            lastEntryTime: this.lastEntryTime,
            lastEntryValue: this.lastEntryValue,
            multiplier: this.multiplier,
        };
    }

    public forecast(futureDate: Date): number {
        const futureTime = futureDate.getTime();
        const futureTimeDiff = futureTime - this.lastEntryTime;
        return this.lastEntryValue + (this.multiplier * futureTimeDiff);
    }
}