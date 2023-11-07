import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const stockTickers = ["AAPL", "MSFT", "TSLA", "AMZN", "META"];
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://s3.tradingview.com/tv.js";

    script.onload = () => {
      if (selectedSymbol) {
        new window.TradingView.widget({
          container_id: `${selectedSymbol}-widget-container`,
          width: "100%",
          height: "500",
          symbol: selectedSymbol,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#333",
          enable_publishing: false,
          withdateranges: true,
          range: "1M",
        });
      }
    };

    document.body.appendChild(script);
  }, [selectedSymbol]);

  const handleSymbolChange = (symbol) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div className="App dark-mode">
      <h1 style={{ textTransform: "uppercase" }}>Stock Data</h1>
      <div className="chart-selector">
        {stockTickers.map((symbol) => (
          <button
            key={symbol}
            onClick={() => handleSymbolChange(symbol)}
            className={symbol === selectedSymbol ? "selected" : ""}
          >
            {symbol}
          </button>
        ))}
      </div>
      {selectedSymbol && (
        <div>
          <h2>{selectedSymbol} Stock Price Chart</h2>
          <div id={`${selectedSymbol}-widget-container`}></div>
        </div>
      )}
    </div>
  );
}

export default App;
