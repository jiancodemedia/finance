import { EChartOption } from "echarts";
import { TimeSeries } from "../../types/api/Forex";
import { fromUnixTime, format } from "date-fns";

export const getChartOptions = (
  data: TimeSeries[],
  ticker: string
): EChartOption => {
  const time = data.map((d) => format(fromUnixTime(d.t), "dd/MMM/yyyy H:mm"));
  const series = data.map((d) => [d.o, d.c, d.l, d.h]);

  return {
    title: {
      text: ticker
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      }
    },
    xAxis: {
      type: "category",
      data: time
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    series: [
      {
        name: ticker,
        type: "candlestick",
        data: series
      }
    ],
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100
      },
      {
        show: true,
        type: "slider"
      }
    ]
  };
};
