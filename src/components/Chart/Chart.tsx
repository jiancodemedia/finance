import { EChartOption } from "echarts";
import { FC, useEffect } from "react";
import * as echarts from "echarts";

type Props = {
  id: string;
  option: EChartOption;
};

export const Chart: FC<Props> = ({ id, option }) => {
  useEffect(() => {
    const chartDom = document.getElementById(id);
    const myChart = echarts.init(chartDom);

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [id, option]);

  return <div id={id} style={{ width: "100%", height: "500px" }} />;
};
