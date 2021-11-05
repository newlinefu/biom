import React from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { PasswordInputHistoryLogObject } from "../types/types";
import { createVectorFunctionData } from "../utils/vector-utils";

interface VectorChartProps {
  inputLog: PasswordInputHistoryLogObject[];
  amplitude: number;
}

const VectorChart = (props: VectorChartProps) => {
  const { inputLog, amplitude } = props;

  const { values, annotations } = createVectorFunctionData(inputLog, amplitude);
  const functionChartOptions: Highcharts.Options = {
    title: {
      text: "Function values",
    },
    xAxis: {
      title: {
        text: "Key times values",
      },
      categories: annotations,
    },
    yAxis: {
      title: {
        text: "Amplitude",
      },
    },
    series: [
      {
        type: "line",
        id: "function",
        name: "Function Value",
        color: "orange",
        data: values,
      },
    ],
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={functionChartOptions}
        {...props}
      />
    </>
  );
};

export default VectorChart;