import { Schedule } from "@widgets/";
import { Flex, Card } from "antd";

export const HomePage = () => {

      // Математические функции для отображения
  const functions = [
    {
      name: 'cos(x)',
      fn: Math.cos,
      range: [0, 2 * Math.PI] as [number, number],
      color: "blue",
    },
    {
      name: 'x²',
      fn: (x: number) => x * x,
      range: [-2, 2] as [number, number],
      color: "green",
    },
    {
      name: 'sin(x)',
      fn: Math.sin,
      range: [0, 2 * Math.PI] as [number, number],
      color: "red",
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