import { Line } from '@ant-design/charts';
import { theme } from 'antd';
import type {FunctionDataItemType, SchedulePropsType} from "../model/types";


export const Schedule = ({functions, title, step=0.1}: SchedulePropsType) => {
  const { token } = theme.useToken();
  
  // Генерация данных для математических функций
  const generateFunctionData = (fn: (x: number) => number, name: string, range: [number, number], step:number): FunctionDataItemType[] => {
    const [start, end] = range;
    const data: FunctionDataItemType[] = [];
    for (let x = start; x <= end; x += step) {
      data.push({
        x,
        y: fn(x),
        functionName: name,
      });
    }
    return data;
  };

  // Собираем все данные в один массив
  const data = functions.flatMap(func => 
    generateFunctionData(func.fn, func.name, func.range, step)
  );


  const config = {
    data,
    xField: 'x',
    yField: 'y',
    seriesField: 'functionName',
    legend: { size: false },
    axis: { x: { title: "x", size: 60 }, y: { title: "y", size: 60 } },
    colorField: functions.map(func => func.color),
    slider: {
      x: { labelFormatter: `~s` },
      y: { labelFormatter: '~s' },
    },
  };

  return (
    <div style={{ 
      background: token.colorBgContainer,
      padding: "1rem",
      borderRadius: token.borderRadiusLG,
      width: "100%"
    }}>
      <h3 style={{ color: token.colorText }}>{title}</h3>
      <div>
        <Line {...config}/>
      </div>
    </div>
  );
};