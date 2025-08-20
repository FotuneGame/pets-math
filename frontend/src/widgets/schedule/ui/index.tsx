import { Line } from '@ant-design/charts';
import { Flex, theme } from 'antd';
import type {SchedulePropsType} from "../model/types";
import {useFunctionData} from '../model/useFunctionData';
import { useAxes } from '../model/useAxes';
import { Zoom, useZoom, Drawer } from '@features/';
import { useDrawer } from '../model/useDrawer';



export const Schedule = ({functions, title, step=0.1, xAxis="x", yAxis="y", height=600}: SchedulePropsType) => {
  const { token } = theme.useToken();
  const {zoom, zoomIn, zoomOut} = useZoom();
  const {axes, viewFilter} = useAxes(zoom);
  const {data} = useFunctionData([...axes, ...functions], viewFilter, step,  xAxis, yAxis);

  const add = (value:string) => {

  }

  const {items} = useDrawer(add);


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
      <Flex gap={10}>
        <Zoom zoomIn={zoomIn} zoomOut={zoomOut}/>
        <Drawer items={items}/>
      </Flex>
      <div>
        <Line {...config}/>
      </div>
    </div>
  );
};