# FNNC
## All in one financial calculation functions
👉🏻 [Package Link](https://www.npmjs.com/package/fnnc)

### Functions List;
- [RSI](https://medium.com/@onurcelik.dev/calculating-the-relative-strength-index-rsi-with-javascript-587976949d78)
- [MACD](https://medium.com/@onurcelik.dev/calculating-the-moving-average-convergence-divergence-macd-with-javascript-646fa2ad5b1)
- MA
- [EMA](https://medium.com/@onurcelik.dev/calculating-the-exponential-moving-average-ema-with-javascript-64db548aa74c)
- SMA
- [STOCH](https://medium.com/@onurcelik.dev/calculating-the-stochastic-oscillator-stoch-with-javascript-bd89a118e7dd)
- [Uptrend](https://medium.com/@onurcelik.dev/calculating-an-up-trend-with-javascript-f8c6fc698e6f)
- [WilliamsPercentR](https://medium.com/@onurcelik.dev/calculating-the-williams-r-with-javascript-51cf24da56a4)
- StandardDeviation
- [BollingerBands](https://medium.com/@onurcelik.dev/calculate-the-bollinger-bands-with-javascript-785c3d74034e)
- AveragePrice
- [Volatility](https://medium.com/@onurcelik.dev/calculating-the-volatility-of-a-stock-with-javascript-a355decbba21)
- [DMI](https://medium.com/@onurcelik.dev/calculating-dmi-directional-movement-index-with-javascript-b65548c6649a)
- [ATR](https://medium.com/@onurcelik.dev/calculating-atr-average-true-range-using-javascript-40e0fc919725)

### How to use?
First import a function that you want from the package
```
 import { EMA } from "fnnc";
```

And then use the function wherever you want.
```
let closingPrices = [ 12, 34, 56, 32, 54, 65];
let period = 12;
const exponentialMovingAverage = EMA(closingPrices, period);

console.log(exponentialMovingAverage) // 33.66031139827575
```