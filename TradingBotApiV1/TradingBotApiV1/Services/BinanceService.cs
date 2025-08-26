using Binance.Net.Clients;
using Binance.Net.Interfaces;
using Binance.Net.Objects.Models.Spot;
using CryptoExchange.Net.Authentication;
using CryptoExchange.Net.Interfaces;
using CryptoExchange.Net.Objects;
using Skender.Stock.Indicators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using TradingBotApi.Apis;
using TradingBotApi.Core;

namespace TradingBotApi.Services.BinanceServices
{
    public class BinanceService //: IBinanceService
    {
        private readonly BinanceRestClient _restClient;

        public BinanceService()
        {
            _restClient = new BinanceRestClient(options =>
            {
                options.ApiCredentials = new ApiCredentials(Credentials.ApiKey, Credentials.SecretKey);

            });
        }

        public async Task<WebCallResult<BinancePrice>?> GetCurrentPrice(string symbol)
        {
            var result = await _restClient.SpotApi.ExchangeData.GetPriceAsync(symbol);

            return result;
        }

        public async Task<WebCallResult<IEnumerable<IBinanceKline>>> GetHistoricalDataAsync(GetCurrencyRequest requestData)
        {           
            var symbol = requestData.Symbol;
            var interval = requestData.Interval;
            var startTime = requestData.StartTime;
            var endTime = requestData.EndTime;
            var result = await _restClient.SpotApi.ExchangeData.GetKlinesAsync(symbol, interval, startTime, endTime);
            return result;
        }
    }
}
