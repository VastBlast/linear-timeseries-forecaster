export function calculateAverage(values: number[]): number {
    return values.reduce((acc, val) => acc + val, 0) / values.length;
}

export function calculateMedian(values: number[], count: number): number {
    if (values.length === 0) return 0;
    if (count <= 0) throw new Error("Count must be positive");

    const sortedValues = [...values].sort((a, b) => a - b);
    const effectiveCount = Math.min(count, sortedValues.length);
    const middleIndex = Math.floor(sortedValues.length / 2);

    if (sortedValues.length % 2 === 0) {
        const startIndex = middleIndex - Math.floor(effectiveCount / 2);
        const endIndex = startIndex + effectiveCount;
        const medianValues = sortedValues.slice(startIndex, endIndex);
        return calculateAverage(medianValues);
    } else {
        const startIndex = middleIndex - Math.floor((effectiveCount - 1) / 2);
        const endIndex = startIndex + effectiveCount;
        const medianValues = sortedValues.slice(startIndex, endIndex);
        return calculateAverage(medianValues);
    }
}