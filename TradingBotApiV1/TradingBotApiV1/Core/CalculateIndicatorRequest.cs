using Skender.Stock.Indicators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TradingBotApi.Core
{
    public class CalculateIndicatorRequest
    {
        public int Period { get; set; }
        public IEnumerable<Quote> Quotes { get; set; }
    }
}
