type ClosingPricesArr = number[];
type Period = number;
interface PriceData {
    open: number;
    high: number;
    low: number;
    close: number;
    time?: number;
}
declare function RSI(closingPrices: ClosingPricesArr): number;
declare function MA(closingPrices: ClosingPricesArr, period: Period): number;
declare function EMA(closingPrices: ClosingPricesArr, period: Period): number;
declare function SMA(closingPrices: ClosingPricesArr): number;
declare function MACD(closingPrices: ClosingPricesArr): number;
declare function STOCH(closingPrices: ClosingPricesArr): number;
declare function Uptrend(closingPrices: ClosingPricesArr, maPeriod: Period): boolean;
declare function WilliamsPercentR(closingPrices: ClosingPricesArr): number;
declare function StandardDeviation(closingPrices: ClosingPricesArr): number;
declare function BollingerBands(closingPrices: ClosingPricesArr, numStdDev: number): object;
declare function AveragePrice(prices: number[]): number;
declare function Volatility(closingPrices: ClosingPricesArr): number;
declare function DMI(prices: PriceData[], periods: number): {
    pdi: number[];
    ndi: number[];
    atr: number[];
    dmi: number[];
};
declare function ATR(prices: PriceData[], periods: number): number[];
export { RSI, MACD, MA, EMA, SMA, STOCH, Uptrend, WilliamsPercentR, StandardDeviation, BollingerBands, AveragePrice, Volatility, DMI, ATR, };
