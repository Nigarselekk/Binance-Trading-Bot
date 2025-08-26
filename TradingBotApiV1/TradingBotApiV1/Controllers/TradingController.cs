using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Skender.Stock.Indicators;
using TradingBotApi.Core;
using TradingBotApi.Services.BinanceServices;
using TradingBotApi.Services.IndicatorService;
using TradingBotApiV1.Core;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TradingBotApiV1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TradingController : ControllerBase
    {


        // POST api/<TradingController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BacktestParameters parameters)
        {
            if (parameters == null)
            {
                return BadRequest("Parameters cannot be null.");
            }
            BinanceService binanceService = new BinanceService();
            IndicatorService _indicatorService = new IndicatorService();
            // 1. Get Historical Data
            var historicalData = await binanceService.GetHistoricalDataAsync(new GetCurrencyRequest
            {
                EndTime = parameters.EndTime,
                StartTime = parameters.StartTime,
                Symbol = parameters.Symbol,
                Interval = (Binance.Net.Enums.KlineInterval)parameters.Interval,
            });

            if (historicalData == null || historicalData.Data == null || !historicalData.Data.Any())
            {
                Console.WriteLine("Error: Historical data could not be retrieved.");
                return BadRequest("Historical data could not be retrieved or is empty.");
            }
            else
            {
                Console.WriteLine("Historical data retrieved successfully.");
            }


            //2.Calculate indicators
            var quotes = historicalData.Data.Select(k => new Quote
            {
                Date = k.CloseTime,
                Open = k.OpenPrice,
                High = k.HighPrice,
                Low = k.LowPrice,
                Close = k.ClosePrice,
                Volume = k.Volume
            }).ToList();

            if (!quotes.Any())
            {
                return BadRequest("No quotes available for the given parameters.");
            }
            //3.indicators apply 
            var rsiResults = _indicatorService.CalculateRsiAsync(new CalculateIndicatorRequest
            {
                Quotes = quotes,
                Period = parameters.Period
            });
            var smaResults = _indicatorService.CalculateSmaAsync(new CalculateIndicatorRequest
            {
                Quotes = quotes,
                Period = parameters.Period
            });
            var macdResults = _indicatorService.CalculateMacdAsync(new CalculateIndicatorRequest
            {
                Quotes = quotes,
                Period = parameters.Period
            });
            //trade
            var currentPrice = await binanceService.GetCurrentPrice(parameters.Symbol);
            var doubleCurrentPrice = Convert.ToDouble(currentPrice.Data.Price);

            double totalBudget = 10000;
            var trades = new List<TradeResult>();
            TradeResult currentTrade = null;
            //q 
            foreach (var data in quotes)
            {
                var rsi = rsiResults.FirstOrDefault(r => r.Date == data.Date)?.Rsi;
                var sma = smaResults.FirstOrDefault(s => s.Date == data.Date)?.Sma;
                var macd = macdResults.FirstOrDefault(s => s.Date == data.Date)?.Macd;
                if (rsi != null && sma != null && macd != null)
                {
                    // Sinyali kontrol et
                    var signal = _indicatorService
                        .CheckSignal(rsi: rsi.Value,
                            currentPrice: doubleCurrentPrice,
                            sma: sma.Value,
                            macd: macd.Value,
                            macdSignal: parameters.MacdSignal,
                            buyRsiThreshold: parameters.BuyRsiThreshold,
                            sellRsiThreshold: parameters.SellRsiThreshold,
                            macdThreshold: parameters.MacdThreshold); ;

                    if (signal == "Buy") // Alım Sinyali
                    {
                        currentTrade = new TradeResult
                        {
                            Coin = parameters.Symbol,
                            BuyPrice = data.Close, // Geçmiş fiyattan alış yapıyoruz
                            BuyTime = data.Date,
                            BuyVolume = totalBudget / (quotes.Count * (double)data.Close)

                        };
                        trades.Add(currentTrade);
                    }
                    else if (signal == "Sell") // Satım Sinyali
                    {
                        currentTrade = new TradeResult
                        {
                            Coin = parameters.Symbol,
                            SellPrice = data.Close, // Geçmiş fiyattan satış yapıyoruz
                            SellTime = data.Date,
                            SellVolume = (totalBudget / quotes.Count) * (double)data.Close
                        };
                        trades.Add(currentTrade); // İşlemi tamamla

                    }
                }
            }

            // Toplam kar/zararı hesapla
            var buyProfit = trades.Sum(x => x.BuyVolume);
            var sellProfit = trades.Sum(x => x.SellVolume);

            var result = new
            {
                Trades = trades,
                TotalProfit = (buyProfit * doubleCurrentPrice + sellProfit) - totalBudget
            };

            // JSON olarak döndürün
            return Ok(result);
        }


    }
}
