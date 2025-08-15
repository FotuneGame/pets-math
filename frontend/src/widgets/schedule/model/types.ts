
export type FunctionType = {
    name: string,
    fn: (x:number)=>number,
    range: [number, number],
    color: string,
}

export type FunctionDataItemType = {
  x: number;
  y: number;
  functionName: string;
}

export type SchedulePropsType = {
    functions: Array<FunctionType>,
    title?: string,
    step: number,
}