import { FC, useEffect, useState } from "react";
import { getCandlesChartTimeSeries } from "../../apis/forex";
import { CandlesRange, CandlesRanges, TimeSeries } from "../../types/api/Forex";
import { ToggleButtons } from "../ToggleButtons/ToggleButtons";
import { getCandlesChartOptions } from "../../utils/chartOptions";
import { Chart } from "../Chart/Chart";

type Props = {
  ticker: string;
};

export const CandlesChart: FC<Props> = ({ ticker }) => {
  const [range, setRange] = useState<CandlesRange>("7d");
  const [timeSeries, setTimeSeries] = useState<TimeSeries[]>([]);

  useEffect(() => {
    const fetchTimeSeries = async () => {
      try {
        const reponse = await getCandlesChartTimeSeries(ticker, range);
        const sorted = reponse.data.data.sort((a, b) => a.t - b.t);
        const resolvedLowest = sorted.map((data) => {
          return {
            ...data,
            l: data.l == 0 ? Math.min(data.h, data.c, data.o) : data.l
          };
        });
        setTimeSeries(resolvedLowest);
      } catch (error) {
        console.error("Error fetching candle time series: ", error);
      }
    };
    fetchTimeSeries();
  }, [ticker, range]);

  return (
    <div>
      <ToggleButtons
        value={range}
        options={CandlesRanges}
        onChange={(value) => setRange(value as CandlesRange)}
      />

      <Chart
        id="candles-chart"
        option={getCandlesChartOptions(timeSeries, ticker)}
      />
    </div>
  );
};
