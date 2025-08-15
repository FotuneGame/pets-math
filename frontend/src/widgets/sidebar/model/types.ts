import type { NavItemType } from "@shared/types/navigation";

export type SidebarPropsType = {
    items: Array<NavItemType>,
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>, 
    collapsed: boolean, 
    defaultSelectedKeys: Array<string> 
}