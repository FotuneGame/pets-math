import { useState } from "react"

export const useList = <T,>(defaultList: T[] = []) => {
    const [list, setList] = useState<T[]>(defaultList);

    const add = (item: T) => setList([...list, item]);
    const remove = (index: number) => setList(list.filter((_, i) => i !== index));
    const update = (index: number, item: T) => setList(list.map((el, i) => i === index ? item : el));
    const clear = () => setList([]);

    return { 
        list, 
        add, 
        remove, 
        update, 
        clear 
    };
}