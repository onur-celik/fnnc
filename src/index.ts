type ClosingPricesArr = number[];
type Period = number;
interface PriceData {
    open: number;
    high: number;
    low: number;
    close: number;
    time?: number;
}

function RSI(closingPrices: ClosingPricesArr): number {
    /*
     * More information about this function can be
     * found @ https://medium.com/@onurcelik.dev/calculating-the-relative-strength-index-rsi-with-javascript-587976949d78
     */
    // Calculate the average of the upward price changes
    let avgUpwardChange = 0;
    for (let i = 1; i < closingPrices.length; i++) {
        avgUpwardChange += Math.max(0, closingPrices[i] - closingPrices[i - 1]);
    }
    avgUpwardChange /= closingPrices.length;

    // Calculate the average of the downward price changes
    let avgDownwardChange = 0;
    for (let i = 1; i < closingPrices.length; i++) {
        avgDownwardChange += Math.max(
            0,
            closingPrices[i - 1] - closingPrices[i]
        );
    }
    avgDownwardChange /= closingPrices.length;

    // Calculate the RSI
    const rsi = 100 - 100 / (1 + avgUpwardChange / avgDownwardChange);

    return rsi;
}

function MA(closingPrices: ClosingPricesArr, period: Period): number {
    // Calculate the moving average
    let sum = 0;
    for (let i = 0; i < period; i++) {
        sum += closingPrices[i];
    }
    const ma = sum / period;

    return ma;
}

function EMA(closingPrices: ClosingPricesArr, period: Period): number {
    const k = 2 / (period + 1);
    let ema = closingPrices[0];
    for (let i = 1; i < closingPrices.length; i++) {
        ema = closingPrices[i] * k + ema * (1 - k);
    }

    return ema;
}

function SMA(closingPrices: ClosingPricesArr): number {
    let sum = 0;
    for (let i = 0; i < closingPrices.length; i++) {
        sum += closingPrices[i];
    }

    return sum / closingPrices.length;
}

function MACD(closingPrices: ClosingPricesArr) {
    /*
     * More information about this function can be
     * found @ https://medium.com/@onurcelik.dev/calculating-the-moving-average-convergence-divergence-macd-with-javascript-646fa2ad5b1
     */
    const ema12 = EMA(closingPrices, 12);
    const ema26 = EMA(closingPrices, 26);
    const macd = ema12 - ema26;

    return macd;
}

function STOCH(closingPrices: ClosingPricesArr) {
    /*
     * More information about this function can be
     * found @ https://medium.com/@onurcelik.dev/calculating-the-stochastic-oscillator-stoch-with-javascript-bd89a118e7dd
     */
    let lowestLow = Number.MAX_VALUE;
    let highestHigh = Number.MIN_VALUE;

    // Find the lowest low and the highest high in the period
    for (let i = 0; i < closingPrices.length; i++) {
        lowestLow = Math.min(lowestLow, closingPrices[i]);
        highestHigh = Math.max(highestHigh, closingPrices[i]);
    }

    // Calculate the STOCH
    const stoch =
        (closingPrices[closingPrices.length - 1] - lowestLow) /
        (highestHigh - lowestLow);

    return stoch;
}

function Uptrend(closingPrices: ClosingPricesArr, maPeriod: Period): boolean {
    /*
     * More information about this function can be
     * found @ https://medium.com/@onurcelik.dev/calculating-an-up-trend-with-javascript-f8c6fc698e6f
     */
    // Calculate the moving average
    const ma = MA(closingPrices, maPeriod);

    // Calculate the RSI
    const rsi = RSI(closingPrices);

    // Check for an uptrend
    const uptrend = ma > 0 && rsi > 50;

    return uptrend;
}

function WilliamsPercentR(closingPrices: ClosingPricesArr) {
    /*
     * More information about this function can be
     * found @ https://medium.com/@onurcelik.dev/calculating-the-williams-r-with-javascript-51cf24da56a4
     */
    let lowestLow = Number.MAX_VALUE;
    let highestHigh = Number.MIN_VALUE;

    // Find the lowest low and the highest high in the period
    for (let i = 0; i < closingPrices.length; i++) {
        lowestLow = Math.min(lowestLow, closingPrices[i]);
        highestHigh = Math.max(highestHigh, closingPrices[i]);
    }

    // Calculate the %R
    const percentR =
        (100 * (closingPrices[closingPrices.length - 1] - highestHigh)) /
        (highestHigh - lowestLow);

    return percentR;
}

function StandardDeviation(closingPrices: ClosingPricesArr): number {
    let sum = 0;
    const sma = SMA(closingPrices);
    for (let i = 0; i < closingPrices.length; i++) {
        sum += Math.pow(closingPrices[i] - sma, 2);
    }

    return Math.sqrt(sum / (closingPrices.length - 1));
}

function BollingerBands(
    closingPrices: ClosingPricesArr,
    numStdDev: number
): object {
    /*
     * More information about this function can be
     * found @ https://medium.com/@onurcelik.dev/calculate-the-bollinger-bands-with-javascript-785c3d74034e
     */
    // Calculate the SMA
    const sma = SMA(closingPrices);

    // Calculate the standard deviation
    const stdDev = StandardDeviation(closingPrices);

    // Calculate the upper and lower bands
    const upperBand = sma + stdDev * numStdDev;
    const lowerBand = sma - stdDev * numStdDev;

    return { upperBand, lowerBand };
}

function AveragePrice(prices: number[]): number {
    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
        sum += prices[i];
    }
    return sum / prices.length;
}

function Volatility(closingPrices: ClosingPricesArr): number {
    /*
     * More information about this function can be
     * found @ https://medium.com/@onurcelik.dev/calculating-the-volatility-of-a-stock-with-javascript-a355decbba21
     */
    // Calculate the daily returns
    const dailyReturns = [];
    for (let i = 1; i < closingPrices.length; i++) {
        dailyReturns.push(
            (closingPrices[i] - closingPrices[i - 1]) / closingPrices[i - 1]
        );
    }

    // Calculate the average daily return
    let sum = 0;
    for (let i = 0; i < dailyReturns.length; i++) {
        sum += dailyReturns[i];
    }
    const avgDailyReturn = sum / dailyReturns.length;

    // Calculate the standard deviation of daily returns
    sum = 0;
    for (let i = 0; i < dailyReturns.length; i++) {
        sum += Math.pow(dailyReturns[i] - avgDailyReturn, 2);
    }
    const stdDev = Math.sqrt(sum / dailyReturns.length);

    // Calculate the volatility
    const volatility = stdDev * Math.sqrt(dailyReturns.length);

    return volatility;
}

function DMI(prices: PriceData[], periods: number) {
    /*
     * More information about this function can be
     * found @ https://medium.com/@onurcelik.dev/calculating-dmi-directional-movement-index-with-javascript-b65548c6649a
     */
    let pdi = [];
    let ndi = [];
    let atr = [];
    let dmi = [];

    for (let i = 0; i < prices.length; i++) {
        // Calculate the positive directional index (PDI)
        let upMove = prices[i].high - prices[i - 1].high;
        let downMove = prices[i - 1].low - prices[i].low;
        let pdiValue = 0;
        if (upMove > downMove && upMove > 0) {
            pdiValue = upMove;
        }
        pdi.push(pdiValue);

        // Calculate the negative directional index (NDI)
        let ndiValue = 0;
        if (downMove > upMove && downMove > 0) {
            ndiValue = downMove;
        }
        ndi.push(ndiValue);

        // Calculate the average true range (ATR)
        let tr = Math.max(
            prices[i].high - prices[i].low,
            Math.abs(prices[i].high - prices[i - 1].close),
            Math.abs(prices[i].low - prices[i - 1].close)
        );
        let atrValue = 0;
        if (i < periods) {
            atrValue = tr;
        } else {
            atrValue = (atr[i - 1] * (periods - 1) + tr) / periods;
        }
        atr.push(atrValue);

        // Calculate the directional movement index (DMI)
        let dmiValue = 0;
        if (atrValue > 0) {
            dmiValue = pdi[i] / atrValue - ndi[i] / atrValue;
        }
        dmi.push(dmiValue);
    }

    return { pdi, ndi, atr, dmi };
}

function ATR(prices: PriceData[], periods: number): number[] {
    /*
     * More information about this function can be
     * found @ https://medium.com/@onurcelik.dev/calculating-atr-average-true-range-using-javascript-40e0fc919725
     */
    let atr = [];

    for (let i = 0; i < prices.length; i++) {
        // Calculate the true range (TR)
        let tr = Math.max(
            prices[i].high - prices[i].low,
            Math.abs(prices[i].high - prices[i - 1].close),
            Math.abs(prices[i].low - prices[i - 1].close)
        );

        // Calculate the ATR
        let atrValue = 0;
        if (i < periods) {
            atrValue = tr;
        } else {
            atrValue = (atr[i - 1] * (periods - 1) + tr) / periods;
        }
        atr.push(atrValue);
    }

    return atr;
}

export {
    RSI,
    MACD,
    MA,
    EMA,
    SMA,
    STOCH,
    Uptrend,
    WilliamsPercentR,
    StandardDeviation,
    BollingerBands,
    AveragePrice,
    Volatility,
    DMI,
    ATR,
};
