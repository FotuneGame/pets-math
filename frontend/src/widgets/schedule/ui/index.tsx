import { Line } from '@ant-design/charts';
import { theme } from 'antd';
import type {SchedulePropsType} from "../model/types";
import {useFunctionData} from '../model/useFunctionData';
import { useAxes } from '../model/useAxes';
import { useZoom } from '../model/useZoom';
import { Zoom } from '@features/';


export const Schedule = ({functions, title, step=0.1, xAxis="x", yAxis="y", height=600}: SchedulePropsType) => {
  const { token } = theme.useToken();
  const {zoom, zoomIn, zoomOut} = useZoom();
  const {axes, viewFilter} = useAxes(zoom);
  const {data} = useFunctionData([...axes, ...functions], viewFilter, step,  xAxis, yAxis);


  const config = {
    data,
    xField: "values",
    yField: "result",
    seriesField: 'functionName',
    legend: { size: false },
    axis: { x: { title: xAxis, size: 60 }, y: { title: yAxis, size: 60 } },
    slider: {
      x: { labelFormatter: `~s` },
      y: { labelFormatter: '~s' },
    },
    connectNulls: {
      connect: false,
    },
    colorField: "functionName",
    height: height,
  };

  return (
    <div style={{ 
      background: token.colorBgContainer,
      padding: "1rem",
      borderRadius: token.borderRadiusLG,
      width: "100%"
    }}>
      <h3 style={{ color: token.colorText }}>{title}</h3>
      <Zoom zoomIn={zoomIn} zoomOut={zoomOut}/>
      <div>
        <Line {...config}/>
      </div>
    </div>
  );
};