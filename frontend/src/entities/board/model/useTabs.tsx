import type { TabsProps } from 'antd';
import type { BoardType } from './types';
import {Row, Col, Button} from "antd";



export const useTabs = (
    click: (char:string)=>void,
    boards: Array<BoardType>
) => {

    const items: TabsProps['items'] = boards.map(board=>(
        {
            key: board.name,
            label: board.title,
            children:  board.keyboardRows.map((row, i) => (
                <Row key={i} justify={"center"}>
                    {
                    row.map(((char, j)=>(
                        <Col key={`${char}_${j}`}>
                            <Button style={{width:"50px"}} size='large' onClick={()=>click(char)}>{char}</Button>
                        </Col>
                    )))
                    }
                </Row>
            ))
        }
    ));

    return {items}
}