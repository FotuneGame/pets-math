import { Button, Flex, Input, Tabs  } from "antd";
import type { BoardPropsType } from "../model/types";
import { PlusCircleOutlined, ClearOutlined } from "@ant-design/icons";
import { useTabs } from "../model/useTabs";
import { boards } from "../model/model";
import { useState } from "react";



export const Board = ({add}:BoardPropsType) => {
    const [value, setValue] = useState<string>("");
    const clear = () => setValue('');
    const click = (char: string) => setValue(prev => prev + char);
    const {items} = useTabs(click, boards);


    return (
        <Flex vertical gap={16}>
            <Flex gap={1}>
                <Button size="large" icon={<ClearOutlined />} onClick={clear}/>
                <Input 
                    size="large"
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                    placeholder="y=ax+b"
                />
                <Button size="large" icon={<PlusCircleOutlined />} onClick={()=>add(value)}/>
            </Flex>
            <Flex>
                <Tabs 
                    style={{width: "100%"}} 
                    items={items}
                />
            </Flex>

        </Flex>
    )
}