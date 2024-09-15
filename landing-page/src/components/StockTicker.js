import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryChart, VictoryLine, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer, VictoryLabel } from 'victory';
import ArticleChip from './ArticleChip';

// Generate random stock prices for a given company over 3 months (90 days)
const generateStockPrices = () => {
  const prices = [];
  let currentPrice = 100; // Starting price
  for (let i = 0; i < 90; i++) { // 90 days for 3 months
    const fluctuation = Math.random() * 10 - 5; // Random fluctuation between -5 and +5
    currentPrice += fluctuation;
    prices.push(currentPrice);
  }
  return prices;
};

// Company list with names and symbols
const companies = [
  { name: 'Apple', symbol: 'AAPL' },
  { name: 'Microsoft', symbol: 'MSFT' },
  { name: 'Google', symbol: 'GOOGL' },
  { name: 'Amazon', symbol: 'AMZN' },
  { name: 'Tesla', symbol: 'TSLA' },
  { name: 'Facebook', symbol: 'META' },
];

const StockTicker = () => {
  // Generate stock prices for all companies and store them
  const initialStockData = companies.reduce((acc, company) => {
    acc[company.symbol] = generateStockPrices();
    return acc;
  }, {});
  
  const [stockData] = useState(initialStockData); // Store stock prices
  const [selectedCompany, setSelectedCompany] = useState(null); // Default to portfolio (null)
  const [hoveredPrice, setHoveredPrice] = useState(null);
  const [expandedCompany, setExpandedCompany] = useState(null);

  // Calculate cumulative sum of all stock prices (entire portfolio)
  const calculatePortfolioCumulative = () => {
    const allPrices = Object.values(stockData);
    return allPrices[0].map((_, index) =>
      allPrices.reduce((acc, prices) => acc + prices[index], 0)
    );
  };

  // Calculate percentage growth/decline for a given stock or the portfolio
  const calculatePercentageChange = (prices) => {
    const startPrice = prices[0];
    const endPrice = prices[prices.length - 1];
    const percentageChange = ((endPrice - startPrice) / startPrice) * 100;
    return percentageChange.toFixed(2);
  };

  // Get the stock prices for the selected company or portfolio
  const getDisplayedPrices = () => {
    if (selectedCompany === null) {
      return calculatePortfolioCumulative(); // Show portfolio view (cumulative)
    } else {
      return stockData[selectedCompany]; // Show individual company stock
    }
  };

  const prices = getDisplayedPrices();
  const percentageChange = calculatePercentageChange(prices);
  const label = selectedCompany ? companies.find(c => c.symbol === selectedCompany).name : 'Your Portfolio';

  // Calculate the total value of all stocks
  const calculateTotalValue = () => {
    return Object.values(stockData).reduce((total, prices) => total + prices[prices.length - 1], 0);
  };

  // Pastel color scale
  const pastelColorScale = [
    "#FFB3BA", // Light Pink
    "#BAFFC9", // Light Green
    "#BAE1FF", // Light Blue
    "#FFFFBA", // Light Yellow
    "#FFD9BA", // Light Orange
    "#E0BBE4"  // Light Purple
  ];

  // Prepare data for the company pie chart
  const companyPieChartData = companies.map(company => ({
    x: company.name,
    y: stockData[company.symbol][stockData[company.symbol].length - 1]
  }));

  // Generate random data for asset allocation pie chart
  const generateRandomPercentage = () => Math.random() * 100;
  const assetAllocationData = [
    { x: "Stocks", y: generateRandomPercentage() },
    { x: "Bonds", y: generateRandomPercentage() },
    { x: "Indexes", y: generateRandomPercentage() },
    { x: "Options", y: generateRandomPercentage() }
  ];
  // Normalize the data to ensure it adds up to 100%
  const total = assetAllocationData.reduce((sum, item) => sum + item.y, 0);
  assetAllocationData.forEach(item => item.y = (item.y / total) * 100);

  const handleCompanyClick = (symbol) => {
    setSelectedCompany(selectedCompany === symbol ? null : symbol);
    setExpandedCompany(expandedCompany === symbol ? null : symbol);
  };

  // Function to generate placeholder headlines
  const getPlaceholderHeadlines = (companyName) => [
    `${companyName} Announces New Product Line `,
    `${companyName} Stock Surges After Earnings Report`,
    `${companyName} CEO Discusses Future Plans`
  ];

  return (
    <div className="stock-ticker bg-gray-100 rounded-lg pt-10 pb-10" style={{boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}}>
      {/* backgroundColor: 'rgba(243, 244, 246, 0.70)',  */}
      <h2 className="text-4xl italic font-bold">
        {label}{' '}
        <span style={{ color: percentageChange > 0 ? 'green' : 'red', fontWeight: 'bold' }}>
          ({percentageChange > 0 ? '+' : ''}{percentageChange}%)
        </span>
      </h2>

      <div className='flex flex-row justify-evenly align-middle items-center'>

        <div className="graph-container gap-0" style={{maxHeight: '400px'}} width={1000}>
          <div className="pie-chart">
            <VictoryPie
              data={companyPieChartData}
              colorScale={pastelColorScale}
              width={360} // Increased from 325
              // padding={60} // Slightly increased padding
              labelRadius={({ innerRadius }) => innerRadius + 80 } // Adjusted for larger size
              labelComponent={
                <VictoryLabel
                  angle={0}
                  textAnchor="middle"
                  verticalAnchor="middle"
                  style={{ fontSize: 10, fill: "black", fontWeight: "bold" }} // Increased font size
                  text={({ datum }) => {
                    const percentage = ((datum.y / calculateTotalValue()) * 100).toFixed(1);
                    return `${datum.x}\n${percentage}%`;
                  }}
                />
              }
            />
          </div>
          <div className="stock-graph p-0">
            <VictoryChart
              width={420} // Increased from 420
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `Day ${datum.x + 1}: $${datum.y.toFixed(2)}`}
                  labelComponent={<VictoryTooltip />}
                />
              }
            >
              <VictoryAxis
                tickFormat={(t) => `Day ${t}`}
                tickCount={7}
                style={{
                  tickLabels: { fontSize: 10, padding: 5 }
                }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(t) => `$${t}`}
                style={{
                  tickLabels: { fontSize: 10, padding: 5 }
                }}
              />
              <VictoryLine
                data={prices.map((price, index) => ({
                  x: index,
                  y: price
                }))}
                style={{
                  data: { stroke: "#6495ED" },
                }}
              />
            </VictoryChart>
          </div>
          <div className="pie-chart">
            <VictoryPie
              data={assetAllocationData}
              colorScale={pastelColorScale}
              width={360} // Increased from 325
              // padding={60} // Slightly increased padding
              labelRadius={({ innerRadius }) => innerRadius + 80 } // Adjusted for larger size
              labelComponent={
                <VictoryLabel
                  angle={0}
                  textAnchor="middle"
                  verticalAnchor="middle"
                  style={{ fontSize: 10, fill: "black", fontWeight: "bold" }} // Increased font size
                  text={({ datum }) => `${datum.x}\n${datum.y.toFixed(1)}%`}
                />
              }
            />
          </div>

        </div>
      </div>

      {/* Company Buttons */}
      <div className="company-buttons">
        {companies.map((company) => (
          <button
            key={company.symbol}
            onClick={() => handleCompanyClick(company.symbol)}
            className={`${company.symbol === selectedCompany ? 'active' : ''} ${company.symbol === expandedCompany ? 'expanded active' : ''}`}
          >
            {company.name}
            <div className="expanded-news-content">
              {company.symbol === expandedCompany &&
                getPlaceholderHeadlines(company.name).map((headline, index) => (
                  <ArticleChip
                    key={index}
                    imageUrl={`https://picsum.photos/100/80?random=${company.symbol}${index}`}
                    summary={headline}
                    link="#"
                  />
                ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
