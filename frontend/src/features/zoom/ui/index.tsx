import { Flex, Button } from "antd"
import type { ZoomProps } from "../model/types"
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons"



export const Zoom = ({zoomIn, zoomOut}: ZoomProps) => {
    return (
        <Flex gap={1}>
            <Button icon={<ZoomInOutlined />}  onClick={zoomIn}/>
            <Button icon={<ZoomOutOutlined />} onClick={zoomOut}/>
        </Flex>
    )
}