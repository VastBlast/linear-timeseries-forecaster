export type DataRecord = {
    date: Date;
    value: number;
}

export enum ForecastMode {
    Average = 'average',
    Median = 'median',
}

export type ForecasterOptions = {
    mode: ForecastMode;
    median_count?: number;
}

export type ForecasterMagic = {
    lastEntryTime: number;
    lastEntryValue: number;
    multiplier: number;
}