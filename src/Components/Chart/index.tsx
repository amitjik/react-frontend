import React, { useState, useEffect } from 'react';
import {
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    Tooltip,
    Bar
  } from "recharts";
interface ColumnChartType {
    action: string;
      pv: number,
}
// const ColumnChart = ({data, titleText, descriptionText}:{data:ColumnChartType[], titleText:string, descriptionText:string}) => {

const ColumnChart = ({data}:{data:ColumnChartType[]}) => {
  const config = {
    // title: {
    //   visible: true,
    //   text: titleText,
    // },
    // description: {
    //   visible: true,
    //   text: descriptionText,
    // },
    // forceFit: true,
    // maxBarWidth: 10,
    width:700,
    height:320,
    data:data,
    // padding: 'auto',
    // xField: 'action',
    // yField: 'pv',
    // conversionTag: { visible: true },
    backgroundColor: ['#0f759c', '#26a2cb', '#65d1fc', '#001b94'],
  };
  return data && <BarChart {...config} >
    <CartesianGrid strokeDasharray="3 3" />
     <XAxis dataKey="action" />
      <YAxis dataKey="pv"/>
      <Tooltip shared={false} trigger="click" />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
  </BarChart>;
};
export default ColumnChart;