import { Line } from '@ant-design/charts';
import { Flex, theme } from 'antd';
import type {SchedulePropsType, FunctionType} from "../model/types";
import {useFunctionData} from '../model/useFunctionData';
import { Zoom, useZoom, Drawer, Functions, Axes, useAxes } from '@features/';
import { useList } from '@shared/hooks/useList';



export const Schedule = ({title, defaultFunctions=[], step=0.1, xAxis="x", yAxis="y", height=600}: SchedulePropsType) => {
  const {list: functions, add, remove, update, clear} = useList<FunctionType>(defaultFunctions);
  const { token } = theme.useToken();
  const {zoom, zoomIn, zoomOut} = useZoom();
  const {axes, viewFilter, x, y} = useAxes(xAxis, yAxis, zoom);
  const {data} = useFunctionData([...axes, ...functions], viewFilter, step,  x[0], y[0]);


  const config = {
    data,
    xField: "values",
    yField: "result",
    seriesField: 'functionName',
    legend: { size: false },
    axis: { x: { title: x[0], size: 60 }, y: { title: y[0], size: 60 } },
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
        <Axes x={x} y={y}/>
        <Drawer items={[
          {
            key: 'Functions',
            label: 'Функции',
            children: <Functions 
              functions={functions}
              add={add}
              remove={remove}
              update={update}
              clear={clear}
            />,
          }
        ]}/>
      </Flex>
      <div>
        <Line {...config}/>
      </div>
    </div>
  );
};