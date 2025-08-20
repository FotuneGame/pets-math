import { useState } from "react";
import { Flex, Button, Drawer as DrawerAntd, Tabs } from "antd"
import {EditOutlined} from "@ant-design/icons";
import type { DrawerPropsType } from "../model/types";



export const Drawer = ({items}: DrawerPropsType) => {
    const [open, setOpen] = useState<boolean>(false);

    return(
         <Flex gap={1}>
            <Button icon={<EditOutlined />} onClick={()=>setOpen(true)}/>
            <DrawerAntd
                placement={"bottom"}
                closable={false}
                onClose={()=>setOpen(false)}
                open={open}
            >
                <Tabs defaultActiveKey="1" items={items}/> 
            </DrawerAntd>
        </Flex>
    )
}