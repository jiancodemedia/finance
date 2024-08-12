import React, { useEffect, useState } from "react";
import { Container, TextField } from "@mui/material";
import * as echarts from "echarts";

interface TickerData {
  publisher: string;
  ticker: string;
}

function Chart() {
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.finazon.io/latest/binance/binance/tickers?page_size=1000",
          {
            method: "GET",
            headers: {
              Authorization: "apikey 855c0ef53fa7486c99a2e7386bc8e49a9v"
            }
          }
        );

        const data = await response.json();

        const labels = data.data.map((item: TickerData) => item.ticker);
        const salesData = Array.from({ length: labels.length }, () =>
          Math.floor(Math.random() * 100)
        );

        setChartLabels(labels);
        setChartData(salesData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const chartDom = document.getElementById("main") as HTMLElement;
    const myChart = echarts.init(chartDom);

    const lowercasedText = filterText.toLowerCase();
    const filteredLabels = chartLabels.filter((label) =>
      label.toLowerCase().includes(lowercasedText)
    );
    const filteredData = chartData.filter((_, index) =>
      chartLabels[index].toLowerCase().includes(lowercasedText)
    );

    myChart.setOption({
      title: {
        text: "Live Binance Tickers Example"
      },
      tooltip: {},
      xAxis: {
        data: filteredLabels
      },
      yAxis: {},
      series: [
        {
          name: "sales",
          type: "bar",
          data: filteredData
        }
      ]
    });

    return () => {
      myChart.dispose();
    };
  }, [chartLabels, chartData, filterText]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  return (
    <Container>
      <TextField
        label="Filter Tickers"
        variant="outlined"
        fullWidth
        value={filterText}
        onChange={handleFilterChange}
        style={{ marginBottom: "20px" }}
      />
      <div id="main" style={{ width: "100%", height: "400px" }}></div>
    </Container>
  );
}

export default Chart;
