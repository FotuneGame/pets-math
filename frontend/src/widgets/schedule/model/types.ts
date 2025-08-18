
export type AxisType = Record<string, number>


export type FunctionType = {
  name: string,
  fn: (variables: AxisType) => Array<number>,    // Функция принимает объект с переменными
  ranges: {                        // Диапазоны для каждой переменной
      [K in keyof AxisType]: [number, number]
  },
  color: string,
  axesFunc: keyof AxisType,        // Какую переменную использовать как ось функции,
  axesArg: Partial<AxisType>,      // Фиксированные значения
  step?: number,                   // шаг рендера
  circle?: number                   // Зацикливание в круг по часовой стрелке кол-во кругов
};

export type FunctionDataItemType= {
  values: number;
  result: number;
  functionName: string;
};

export type SchedulePropsType = {
    functions: Array<FunctionType>,
    step: number,
    title?: string,
    xAxis?: string, 
    yAxis?: string,
    height?: number,
}