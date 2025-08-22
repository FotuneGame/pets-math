import { Schedule } from "@widgets/";
import { Flex, Card } from "antd";
import type { FunctionType, AxisType } from "@widgets/schedule/model/types";

export const HomePage = () => {

  // Математические функции для отображения
  const functions: Array<FunctionType> = [
    {
      name: 'cos(x)',
      fn: (variables: AxisType) => [Math.cos(variables.x)],
      ranges: {
        x: [-10 * Math.PI, 10 * Math.PI]
      },
      color: "red",
      axesFunc: "x",
      axesArg: {},
      step: 0.5
    },
    {
      name: 'sin(x)',
      fn: (variables: AxisType) => [Math.sin(variables.x)],
      ranges: {
        x: [-8 * Math.PI, 8 * Math.PI]
      },
      color: "blue",
      axesFunc: "x",
      axesArg: {},
      step: 0.3
    },
    {
      name: 'x^2',
      fn: (variables: AxisType) => [Math.pow(variables.x, 2)],
      ranges: {
        x: [-5, 5]
      },
      color: "green",
      axesFunc: "x",
      axesArg: {},
      step: 0.2
    },
    {
      name: 'sqrt(|x|)',
      fn: (variables: AxisType) => [Math.sqrt(Math.abs(variables.x))],
      ranges: {
        x: [-10, 10]
      },
      color: "purple",
      axesFunc: "x",
      axesArg: {},
      step: 0.25
    },
    {
      name: 'e^x',
      fn: (variables: AxisType) => [Math.exp(variables.x)],
      ranges: {
        x: [-3, 3]
      },
      color: "orange",
      axesFunc: "x",
      axesArg: {},
      step: 0.1
    },
    {
      name: '1/x',
      fn: (variables: AxisType) => [1 / variables.x],
      ranges: {
        x: [-5, 5]
      },
      color: "cyan",
      axesFunc: "x",
      axesArg: {},
      step: 0.01
    },
    {
      name: 'tan(x)',
      fn: (variables: AxisType) => [Math.tan(variables.x)],
      ranges: {
        x: [-Math.PI/2 + 0.1, Math.PI/2 - 0.1] // Избегаем асимптоты
      },
      color: "magenta",
      axesFunc: "x",
      axesArg: {},
      step: 0.05
    },
    {
      name: '-sqrt(x)',
      fn: (variables: AxisType) => [-Math.sqrt(variables.x)],
      ranges: {
        x: [-1, 5]
      },
      color: "#ddd123",
      axesFunc: "x",
      axesArg: {},
      step: 0.1
    },
    {
      name: 'x^3 - 2x',
      fn: (variables: AxisType) => [Math.pow(variables.x, 3) - 2 * variables.x],
      ranges: {
        x: [-3, 3]
      },
      color: "brown",
      axesFunc: "x",
      axesArg: {},
      step: 0.1
    },
    {
      //вариант грамотного отображения это доп функция для вверха и низа
      name: 'Circle (y = √(r² - x²))',
      fn: (variables: AxisType) => {
        const r = variables.r;
        const x = variables.x;
        const term = r*r - x*x;
        return term >= 0 ? [Math.sqrt(term), -Math.sqrt(term)] : [0, 0];
      },
      ranges: { x: [-3, 3] },
      color: "#ff00aa",
      axesFunc: "x",
      axesArg: { r: 2 },
      step: 0.05,
      circle: 1
    },
    {
      name: 'Ellipse (y = b√(1 - x²/a²))',
      fn: (variables: AxisType) => {
        const { a, b, h, k } = variables;
        const x = variables.x;
        const term = 1 - Math.pow((x - h)/a, 2);
        return term >= 0 ? [k + b * Math.sqrt(term), k - b * Math.sqrt(term)] : [0, 0];
      },
      ranges: { x: [-5, 5]  },
      color: "#00aa88",
      axesFunc: "x",
      axesArg: { 
        a: 3,  // полуось по X
        b: 1.5, // полуось по Y
        h: 1,   // смещение по X
        k: 2    // смещение по Y
      }, // a - полуось по X, b - по Y
      step: 0.05,
      circle: 1
    },
  ];

  return(
      <Flex style={{width:"100%"}} justify="center">
          <Card style={{ width: '100%' }}>
              <Schedule defaultFunctions={functions} step={0.1} title={"Test"}/>
          </Card>
      </Flex>
  )
}