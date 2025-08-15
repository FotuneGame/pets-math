import type { NavItemType } from "@shared/types/navigation";



export const findUrlByKey = (key: string, items: Array<NavItemType>): null | string => {
    for (const item of items) {
        if (item.key?.toString() === key) {
            return item.url;
        }
        if (item.children) {
            const childUrl = findUrlByKey(key, item.children);
            if (childUrl) return childUrl;
        }
    }
    return null;
};