import { useEffect, useState } from "react";
import {
  Autocomplete,
  Container,
  TextField,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import * as echarts from "echarts";
import { getPrice, getTickers, getTimeSeries } from "../../apis/forex";
import { Interval, Intervals, TimeSeries } from "../../types/api/Forex";
import { getChartOptions } from "./utils";

// We are only allowed to use the tickers below for free
const availableTickers = ["EUR/USD", "AUD/USD", "GBP/USD"];

function Chart() {
  const [tickers, setTickers] = useState<string[]>([]);
  const [selectedTicker, setSelectedTickers] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [selectedInterval, setSelectedInterval] = useState<Interval>("1h");
  const [timeSeries, setTimeSeries] = useState<TimeSeries[]>([]);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await getTickers(1000);
        let tickerList = response.data.data.map((ticker) => ticker.ticker);
        tickerList = tickerList.filter((ticker) =>
          availableTickers.includes(ticker)
        );
        setTickers(tickerList);
        setSelectedTickers(tickerList[0]);
      } catch (error) {
        console.error("Error fetching tickers: ", error);
      }
    };

    fetchTickers();
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const reponse = await getPrice(selectedTicker);
        setPrice(reponse.data.p);
      } catch (error) {
        console.error("Error fetching price: ", error);
      }
    };
    fetchPrice();
  }, [selectedTicker]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const reponse = await getTimeSeries(selectedTicker, selectedInterval);
        setTimeSeries(reponse.data.data);
      } catch (error) {
        console.error("Error fetching time series: ", error);
      }
    };
    fetchPrice();
  }, [selectedTicker, selectedInterval]);

  useEffect(() => {
    if (timeSeries.length == 0) return;

    const chartDom = document.getElementById("main") as HTMLDivElement;
    const myChart = echarts.init(chartDom);
    const options = getChartOptions(timeSeries, selectedTicker);
    myChart.setOption(options);
  }, [timeSeries]);

  return (
    <Container>
      <Autocomplete
        value={selectedTicker}
        options={tickers}
        sx={{ width: 160 }}
        renderInput={(params) => <TextField {...params} label="FX" />}
        onChange={(event, newValue) => {
          setSelectedTickers(newValue);
        }}
        disableClearable
      />
      <div>
        <span>Price: </span>
        <span>{price}</span>
      </div>

      <ToggleButtonGroup
        value={selectedInterval}
        exclusive
        aria-label="text alignment"
        onChange={(event, value) => setSelectedInterval(value)}
      >
        <IntervalToggleButtons />
      </ToggleButtonGroup>

      <div id="main" style={{ width: "100%", height: "400px" }}></div>
    </Container>
  );
}

const IntervalToggleButtons = () => {
  return (
    <>
      {Intervals.map((interval) => {
        return (
          <ToggleButton key={interval} value={interval}>
            {interval}
          </ToggleButton>
        );
      })}
    </>
  );
};

export default Chart;
