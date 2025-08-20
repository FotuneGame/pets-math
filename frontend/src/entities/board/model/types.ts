export type BoardPropsType = {
    add: (value: string) => void
}

export type BoardType = {
    name: string,
    title: string,
    keyboardRows: Array<Array<string>>
}