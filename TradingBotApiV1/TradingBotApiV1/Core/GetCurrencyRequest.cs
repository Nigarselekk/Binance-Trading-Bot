namespace TradingBotApi.Core
{
    public class GetCurrencyRequest
    {
        public string Symbol { get; set; }
        public Binance.Net.Enums.KlineInterval Interval { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
