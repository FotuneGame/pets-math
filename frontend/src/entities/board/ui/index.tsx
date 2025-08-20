import { Flex, Input, Row, Col, Button  } from "antd";
import type { BoardPropsType } from "../model/types";



export const Board = ({value, setValue}:BoardPropsType) => {


    const clear = () => setValue('');
    const click = (char: string) => setValue(prev => prev + char);

    const keyboardRows = [
        ['7', '8', '9', '(', ')', 'π', '∞'],
        ['4', '5', '6', '+', '-', '×', '÷'],
        ['1', '2', '3', 'x', 'y', 'z', '^'],
        ['0', '.', '=', '<', '>', '≤', '≥'],
        ['sin', 'cos', 'tan', '√', '∫', '∑', '∏']
    ];

    return (
        <Flex vertical gap={16}>
            <Input 
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                placeholder="y=ax+b"
            />
            { 
            keyboardRows.map(row => (
                <Row>
                    {
                    row.map((char=>(
                        <Col>
                            <Button onClick={()=>click(char)}>{char}</Button>
                        </Col>
                    )))
                    }
                </Row>
            ))
            }
            

        </Flex>
    )
}