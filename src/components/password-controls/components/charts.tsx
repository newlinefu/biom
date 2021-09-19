import React from "react";
import { PasswordInputHistoryLogObject } from "../types/types";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ChartProps {
  readonly inputLog: PasswordInputHistoryLogObject[];
}

const Charts = (props: ChartProps) => {
  const { inputLog } = props;
  const dynamicOptions: Highcharts.Options = {
    title: {
      text: "Dynamic",
    },
    xAxis: {
      title: {
        text: "Key",
      },
      categories: inputLog.map((record) => record.key),
    },
    yAxis: {
      title: {
        text: "Hold time",
      },
    },
    series: [
      {
        type: "line",
        id: "dynamic",
        name: "Dynamic",
        color: "red",
        data: inputLog.map(
          (record) => (record.keyUpTime - record.keyDownTime) / 1000
        ),
      },
    ],
  };

  const intervals: number[] = [];
  const intervalsLegend: string[] = [];
  for (let i = 1; i < inputLog.length; i++) {
    intervals.push(
      (inputLog[i].keyDownTime - inputLog[i - 1].keyDownTime) / 1000
    );
    intervalsLegend.push(`${inputLog[i - 1].key} - ${inputLog[i].key}`);
  }
  inputLog.length > 0 && intervalsLegend.push(`${inputLog[inputLog.length - 1].key} - ...`)

  const intervalOptions: Highcharts.Options = {
    title: {
      text: "Intervals",
    },
    xAxis: {
      title: {
        text: "Keys state transition",
      },
      categories: intervalsLegend,
    },
    yAxis: {
      title: {
        text: "Interval",
      },
    },
    series: [
      {
        type: "line",
        id: "intervals",
        name: "Intervals",
        color: "green",
        data: intervals,
      },
    ],
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={dynamicOptions}
        {...props}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={intervalOptions}
        {...props}
      />
    </>
  );
};

export default Charts;
