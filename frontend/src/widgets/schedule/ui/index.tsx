import { Line } from '@ant-design/charts';
import { theme } from 'antd';
import type {AxisType, FunctionDataItemType, FunctionType, SchedulePropsType} from "../model/types";
import { useAxes } from '../model/useAxes';
import { useMove } from '../model/useMove';
import { useZoom } from '../model/useZoom';
import { Zoom } from '@features/';


export const Schedule = ({functions, title, step=0.1, xAxis="x", yAxis="y", height=600}: SchedulePropsType) => {
  const { token } = theme.useToken();
  const {zoom, zoomIn, zoomOut} = useZoom(1);
  const {axes} = useAxes(zoom, 10);
  const { position, isDragging, handlers, resetPosition } = useMove();

  
  // Генерация данных для математических функций
  const generateFunctionData = (
    func: FunctionType,
    defaultStep: number
  ): FunctionDataItemType[] => {
    const mainAxisKey = func.axesFunc;
    const [start, end] = func.ranges[mainAxisKey];
    const step = func.step || defaultStep;

    const data: FunctionDataItemType[] = [];


    for (let val = start; val <= end; val += step) {
      const variables = {
        ...func.axesArg,
        [mainAxisKey]: val
      } as AxisType;
  
      if(mainAxisKey===xAxis)
        data.push({
          values: variables[mainAxisKey],
          result: func.fn(variables),
          functionName: func.name,
        });
      else if(mainAxisKey===yAxis)
        data.push({
          values: func.fn(variables),
          result: variables[mainAxisKey],
          functionName: func.name,
        });
    }
    return data;
  };

  // Собираем все данные в один массив
  const data = [...functions, ...axes].flatMap(func => 
    generateFunctionData(func, step)
  );


  //трансформированные данные
  const transformedData = data.map(item => ({
    ...item,
    values: item.values + position.x,
    result: item.result + position.y
  }));



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
    colorField: "functionName",
    height: height, // Фиксированная высота в пикселях
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
      <div 
        style={{ 
          width: "100%",
          height: `${height}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        {...handlers}
      >
        <Line {...config}/>
      </div>
    </div>
  );
};