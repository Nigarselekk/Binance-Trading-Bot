
namespace TradingBotApi.Core
{
    public class TradeResult
    {
        public string Coin { get; set; }         
        public decimal BuyPrice { get; set; }    
        public DateTime BuyTime { get; set; }    
        public decimal? SellPrice { get; set; }  
        public DateTime? SellTime { get; set; }  

        public double SellVolume {get; set; }
        public double BuyVolume { get; set; }
        public decimal Profit => SellPrice.HasValue ? SellPrice.Value - BuyPrice : 0; 
    }

}
