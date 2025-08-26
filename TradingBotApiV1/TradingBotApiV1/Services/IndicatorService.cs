using Skender.Stock.Indicators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Text;
using System.Threading.Tasks;
using TradingBotApi.Core;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TradingBotApi.Services.IndicatorService
{
    public class IndicatorService //: IIndicatorService
    {
        public IEnumerable<RsiResult>? CalculateRsiAsync(CalculateIndicatorRequest requestData)
        {
            var period = requestData.Period;
            var quotes = requestData.Quotes;
            var result = quotes.GetRsi(period);
            return result;
        }

        public IEnumerable<SmaResult>? CalculateSmaAsync(CalculateIndicatorRequest requestData)
        {
            var period = requestData.Period;
            var quotes = requestData.Quotes;
            var result = quotes.GetSma(period);
            return result;
        }
        public IEnumerable<MacdResult>? CalculateMacdAsync(CalculateIndicatorRequest requestData)
        {
            var period = requestData.Period;
            var quotes = requestData.Quotes;
            var result = quotes.GetMacd(period);
            return result;
        }
        public IEnumerable<EmaResult>? CalculateEmaAsync(CalculateIndicatorRequest requestData)
        {
            var period = requestData.Period;
            var quotes = requestData.Quotes;
            var result = quotes.GetEma(period);
            return result;
        }
        //public IEnumerable<ParabolicSarResult>? CalculatePsarAsync(CalculateIndicatorRequest requestData)
        //{
        //    var period = requestData.Period;
        //    var quotes = requestData.Quotes;
        //    var step = 0.02; // Acceleration Step (Genellikle küçük bir değer: 0.01 - 0.05)
        //    var maximum = 0.2; // Max Acceleration Factor (Genellikle 0.2 civarı)
        //    var result = quotes.GetParabolicSar(period,maximum,step);
        //    return result;
        //}
        public bool? CheckSignal(double rsi, double currentPrice, double sma, double buyRsiThreshold = 30, double sellRsiThreshold = 70)
        {
            if (rsi < buyRsiThreshold && currentPrice > sma)
                return true; // Alım Sinyali
            if (rsi > sellRsiThreshold && currentPrice < sma)
                return false; // Satım Sinyali
            return null; // Nötr
        }
        public string CheckSignal(
            double? rsi,
            double? currentPrice,
            double? sma,
            double? macd,
            double? macdSignal = -174.16,
            double buyRsiThreshold = 30,
            double sellRsiThreshold = 70,
            double macdThreshold = 0
           
        )
        {
            // Alım satım sinyalini başlat
            TradingSignal signal = new TradingSignal
            {
                
                Action = "Hold"
            };

            // RSI aşırı satım seviyesinde ise ve MACD sinyali pozitif bir kesişim gösteriyorsa al
            if (rsi < 30 && macd > macdSignal)
            {
                signal.Action = "Buy";
            }
            // RSI aşırı alım seviyesinde ise ve MACD sinyali negatif bir kesişim gösteriyorsa sat
            else if (rsi > 70 && macd < macdSignal)
            {
                signal.Action = "Sell";
            }
            // Fiyat SMA'nın üzerindeyse al 
            else if (currentPrice > sma )
            {
                signal.Action = "Buy";
            }
            // Fiyat SMA'nın altında  sat
            else if (currentPrice < sma )
            {
                signal.Action = "Sell";
            }

            //Console.WriteLine($"ACTION:{signal.Action}");
            return signal.Action;
        }

    }

    
}
