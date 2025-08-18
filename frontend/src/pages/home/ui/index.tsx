import { Schedule } from "@widgets/";
import { Flex, Card } from "antd";
import type { FunctionType, AxisType } from "@widgets/schedule/model/types";

export const HomePage = () => {

  // Математические функции для отображения
  const functions: Array<FunctionType> = [
    {
      name: 'cos(x)',
      fn: (variables: AxisType) => Math.cos(variables.x), // Используем AxisType
      ranges: {
        x: [-2 * Math.PI, 2 * Math.PI] // Диапазон для x
      },
      color: "red",
      axesFunc: "x", // Генерируем значения по оси X
      axesArg: {} // Дополнительные аргументы
    },
  ];

    return(
        <Flex style={{width:"100%"}} justify="center">
            <Card style={{ width: '100%' }}>
                <Schedule functions={functions} step={0.1} title={"Test"}/>
            </Card>
        </Flex>
    )
}