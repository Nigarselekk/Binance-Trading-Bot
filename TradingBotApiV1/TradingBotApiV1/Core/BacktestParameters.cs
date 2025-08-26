using Skender.Stock.Indicators;

namespace TradingBotApiV1.Core
{
    public class BacktestParameters
    {
        public int Period { get; set; }

        public string Symbol { get; set; }
        public int Interval { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime
        {
            get; set;
        }

        public double? MacdSignal { get; set; } = -174.16;
        public double BuyRsiThreshold { get; set; } = 30;
        public double SellRsiThreshold { get; set; } = 70;
        public double MacdThreshold { get; set; } = 0;
    }
}
