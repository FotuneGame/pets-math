import type { TabsProps } from 'antd';
import { Board } from '@entities/';
import { useState } from 'react';



export const useDrawer = (add: (value:string)=> void) => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'calc',
            children: <Board add={add}/>,
        },
        {
            key: '2',
            label: 'functions',
            children: <Board add={add}/>,
        },
    ];

    return {items}
}