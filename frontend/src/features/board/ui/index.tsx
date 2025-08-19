import { useState } from "react";
import { Flex, Button, Drawer, Input } from "antd"
import {EditOutlined} from "@ant-design/icons";


export const Board = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");
    return(
         <Flex gap={1}>
            <Button icon={<EditOutlined />} onClick={()=>setOpen(true)}/>
            <Drawer
                placement={"bottom"}
                closable={false}
                onClose={()=>setOpen(false)}
                open={open}
            >
                <Flex vertical gap={16}>
                    <Input 
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                        placeholder="y=ax+b"
                    />
                </Flex>
            </Drawer>
        </Flex>
    )
}