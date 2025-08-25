import { useState } from "react";
import type { AxesPropsType } from "../model/types";
import { Flex, Input } from "antd";

export const Axes = ({x, y}: AxesPropsType) => {

    const [xName, setX] = x;
    const [yName, setY] = y;

    return (
        <Flex gap={1}>
            <Input placeholder={yName} value={yName} onChange={(e)=>setY(e.target.value)}/>
            <Input placeholder={xName} value={xName} onChange={(e)=>setX(e.target.value)}/>
        </Flex>
    );
} 