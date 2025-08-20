import type { TabsProps } from 'antd';
import { Board } from '@entities/';
import { useState } from 'react';



export const useDrawer = () => {
    const [value, setValue] = useState<string>("");

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'calc',
            children: <Board value={value} onChange={setValue}/>,
        },
        {
            key: '2',
            label: 'functions',
            children: <Board value={value} onChange={setValue}/>,
        },
    ];

    return {items, value}
}