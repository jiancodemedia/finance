import { FC, useEffect, useState } from "react";
import { getLineChartTimeSeries } from "../../apis/forex";
import { LineRange, LineRanges, TimeSeries } from "../../types/api/Forex";
import { ToggleButtons } from "../ToggleButtons/ToggleButtons";
import { getLineChartOptions } from "../../utils/chartOptions";
import { Chart } from "../Chart/Chart";

type Props = {
  ticker: string;
};

export const LineChart: FC<Props> = ({ ticker }) => {
  const [range, setRange] = useState<LineRange>("1d");
  const [timeSeries, setTimeSeries] = useState<TimeSeries[]>([]);

  useEffect(() => {
    const fetchTimeSeries = async () => {
      try {
        const reponse = await getLineChartTimeSeries(ticker, range);
        const sorted = reponse.data.data.sort((a, b) => a.t - b.t);
        setTimeSeries(sorted);
      } catch (error) {
        console.error("Error fetching line time series: ", error);
      }
    };
    fetchTimeSeries();
  }, [ticker, range]);

  return (
    <div>
      <ToggleButtons
        value={range}
        options={LineRanges}
        onChange={(value) => setRange(value as LineRange)}
      />

      <Chart id="line-chart" option={getLineChartOptions(timeSeries, ticker)} />
    </div>
  );
};
