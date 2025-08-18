import type {AxisType, FunctionDataItemType, FunctionType} from "./types";



export const useFunctionData = (
    functions: FunctionType[],
    viewFilter: (values:number, result:number)=>boolean, 
    step=0.1, 
    xAxis='x', 
    yAxis='y'
) => {

    //валидация отображения точек
    const valid = (data: FunctionDataItemType[], value: number, result: number, name: string) => {
        if (!viewFilter(value, result)){
            data.push({
                values: NaN,
                result: NaN,
                functionName: name,
            });
            return false;
        }
        return true;
    }



    // Генерация данных для математических функций
    const generateFunctionData = (
        func: FunctionType,
        defaultStep: number
    ): FunctionDataItemType[] => {
        const mainAxisKey = func.axesFunc;
        const [start, end] = func.ranges[mainAxisKey];
        const step = func.step || defaultStep;
       
        const fixed = step.toString().split(".")?.[1]?.length ?? 0;

        const data: FunctionDataItemType[] = [];


        // Для круга - сначала все положительные y, затем отрицательные в обратном порядке
        if (func.circle) {
            // Положительная полуокружность (движение слева направо)
            for(let ri = 0; ri < func.circle*2; ri +=2){
                for (let val = start; val <= end; val += step) {
                    const variables = { ...func.axesArg, [mainAxisKey]: val } as AxisType;
                    const value = variables[mainAxisKey];
                    const results = func.fn(variables);

                    if (!valid(data, value, results[ri], func.name))
                        continue;
                    
                    
                    if (results[ri]) {
                        data.push({
                            values: Number(value.toFixed(fixed)),
                            result: Number(results[ri].toFixed(fixed)),
                            functionName: func.name,
                        });
                    }
                }
            }
            
            // Отрицательная полуокружность (движение справа налево)
            for(let ri = 1; ri < func.circle*2; ri +=2){
                for (let val = end; val >= start; val -= step) {
                    const variables = { ...func.axesArg, [mainAxisKey]: val } as AxisType;
                    const value = variables[mainAxisKey];
                    const results = func.fn(variables);
                    
                    if (!valid(data, value, results[ri], func.name))
                        continue;
                    
                    if (results[ri]) {
                        data.push({
                            values: Number(value.toFixed(fixed)),
                            result: Number(results[ri].toFixed(fixed)),
                            functionName: func.name,
                        });
                    }
                }
            }

            // Замыкаем круг - добавляем первую точку в конец
            if (data.length > 0) {
                data.push({...data[0]});
            }

        } else {
            // Стандартная обработка для других функций
            for (let val = start; val <= end; val += step) {
                const variables = { ...func.axesArg, [mainAxisKey]: val } as AxisType;
                const value = variables[mainAxisKey];
                const results = func.fn(variables);

                for (let res of results) {
                    if (!valid(data, value, res, func.name))
                        continue;
                    
                    if (mainAxisKey === xAxis) {
                        data.push({
                            values: Number(value.toFixed(fixed)),
                            result: Number(res.toFixed(fixed)),
                            functionName: func.name,
                        });
                    } else if (mainAxisKey === yAxis) {
                        data.push({
                            values: Number(res.toFixed(fixed)),
                            result: Number(value.toFixed(fixed)),
                            functionName: func.name,
                        });
                    }
                }
            }
        }
        return data;
    };

      // Собираем все данные в один массив
    const data = functions.flatMap(func => 
        generateFunctionData(func, step)
    );

    return {data};
}