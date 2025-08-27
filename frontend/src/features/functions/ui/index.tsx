import type { FunctionsPropsType, FunctionType } from "../model/types";
import { FunctionFrom } from "@entities/";
import { Collapse, Flex, Button} from 'antd';
import { PlusOutlined, ClearOutlined } from "@ant-design/icons";
import { defaultFunction } from "../model/model";



export const Functions = ({functions, add, remove, update, clear}: FunctionsPropsType) => {
    
    return (
        <Flex vertical gap={1}>
            <Flex justify="end" style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                <Button size="large" icon={<ClearOutlined />} onClick={clear}/>
            </Flex>
            <Collapse 
                size="large" 
                items={
                    functions.map((func, i)=>({
                        key: func.name+"_"+i,
                        label: func.name,
                        children: <FunctionFrom 
                            func={func} 
                            update={(func:FunctionType)=>update(i,func)}
                            remove={()=>remove(i)}
                        />
                    }))
                } 
            />
            <Flex justify="center" style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                <Button size="large" icon={<PlusOutlined />} onClick={()=>add(defaultFunction)}/>
            </Flex>
        </Flex>
    )
}