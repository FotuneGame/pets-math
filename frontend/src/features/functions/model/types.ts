export type {AxisType, FunctionType} from "@entities/";

export type FunctionsPropsType = {
    functions: FunctionType[],
    add: (item: FunctionType) => void,
    remove: (index: number) => void,
    update: (index: number, item: FunctionType) => void,
    clear: () => void
}