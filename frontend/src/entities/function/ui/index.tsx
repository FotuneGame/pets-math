import type {FunctionPropsType, AxisType} from "../model/types";
import {CodeEditor} from "@shared/ui/";

export const Function = ({func, update, remove}:FunctionPropsType) => {

    const apply = (newFunc:Function) => {
        func.fn = newFunc as ((variables: AxisType) => Promise<Array<number>>);
        update(func);
    }


    return (
       <>
        {func.name}
        <CodeEditor title={"Функция js"} defaultCode={func.fn.toString()} apply={apply}/>
       </> 
    )
}