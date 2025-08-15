export type NavItemType = {
    key: string,
    label: string,
    icon: React.ReactElement,
    children: Array<NavItemType>
}