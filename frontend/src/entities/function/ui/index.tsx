import type {FunctionPropsType} from "../model/types";

export const Function = ({func, update, remove}:FunctionPropsType) => {
    return (
       <>{func.name}</> 
    )
}