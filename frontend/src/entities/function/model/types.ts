export type AxisType = Record<string, number>


export type FunctionType = {
  name: string,
  fn: (variables: AxisType) => Promise<Array<number>>,    // Функция принимает объект с переменными
  ranges: {                        // Диапазоны для каждой переменной
      [K in keyof AxisType]: [number, number]
  },
  color: string,
  axesFunc: keyof AxisType,        // Какую переменную использовать как ось функции,
  axesCount: [keyof AxisType],     //какие переменные динамически подставлят в функцию с шагом step
  axesArg: Partial<AxisType>,      // Фиксированные значения
  step?: number,                   // шаг рендера
  circle?: number                  // Зацикливание в круг по часовой стрелке кол-во кругов
};

export type FunctionPropsType = {
    func: FunctionType,
    update: (func:FunctionType)=>void,
    remove: ()=>void
}