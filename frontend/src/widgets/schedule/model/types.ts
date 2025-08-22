export type {AxisType, FunctionType} from "@entities/";

export type FunctionDataItemType= {
  values: number;
  result: number;
  functionName: string;
};

export type SchedulePropsType = {
    defaultFunctions: Array<FunctionType>,
    step: number,
    title?: string,
    xAxis?: string, 
    yAxis?: string,
    height?: number,
}