import { useEffect, useState, useRef, useCallback } from "react";
import type { AxisType, FunctionDataItemType, FunctionType } from "./types";

export const useFunctionData = (
  functions: FunctionType[],
  viewFilter: (values: number, result: number) => boolean,
  step = 0.1,
  xAxis = 'x',
  yAxis = 'y'
) => {
  const [data, setData] = useState<FunctionDataItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Используем useRef для отслеживания предыдущих значений
  const prevFunctionsRef = useRef<FunctionType[]>(functions);
  const prevStepRef = useRef(step);
  const prevViewFilterRef = useRef(viewFilter);
  const prevXAxisRef = useRef(xAxis);
  const prevYAxisRef = useRef(yAxis);

  // Мемоизируем функцию валидации
  const valid = useCallback((data: FunctionDataItemType[], value: number, result: number, name: string) => {
    if (!viewFilter(value, result)) {
      data.push({
        values: NaN,
        result: NaN,
        functionName: name,
      });
      return false;
    }
    return true;
  }, [viewFilter]);

  // Мемоизируем генерацию данных
  const generateFunctionData = useCallback(async (
    func: FunctionType,
    defaultStep: number
  ): Promise<FunctionDataItemType[]> => {
    try {
      const data: FunctionDataItemType[] = [];
      for(let axis of func.axesCount){
        const mainAxisKey = axis;
        const resAxisKey = func.axesFunc;
  
        if(mainAxisKey!==xAxis && mainAxisKey!==yAxis || resAxisKey!==xAxis && resAxisKey !==yAxis)
          continue;
     
        const [start, end] = func.ranges[mainAxisKey] || [0, 0];
        const step = func.step || defaultStep;
        const fixed = step.toString().split(".")?.[1]?.length ?? 0;

        // Для круга
        if (func.circle) {
          // Положительная полуокружность
          for (let ri = 0; ri < func.circle * 2; ri += 2) {
            for (let val = start; val <= end; val += step) {
              const variables = { ...func.axesArg, [mainAxisKey]: val } as AxisType;
              const value = variables[mainAxisKey];
              const results = await func.fn(variables);

              if (!valid(data, value, results[ri], func.name) || !results[ri]) continue;
              
              if (resAxisKey === yAxis) {
                data.push({
                  values: Number(value.toFixed(fixed)),
                  result: Number(results[ri].toFixed(fixed)),
                  functionName: func.name,
                });
              } else if (resAxisKey === xAxis) {
                data.push({
                  values: Number(results[ri].toFixed(fixed)),
                  result: Number(value.toFixed(fixed)),
                  functionName: func.name,
                });
              }
            }
          }
          
          // Отрицательная полуокружность
          for (let ri = 1; ri < func.circle * 2; ri += 2) {
            for (let val = end; val >= start; val -= step) {
              const variables = { ...func.axesArg, [mainAxisKey]: val } as AxisType;
              const value = variables[mainAxisKey];
              const results = await func.fn(variables);
              
              if (!valid(data, value, results[ri], func.name) || !results[ri]) continue;
              
              if (resAxisKey === yAxis) {
                data.push({
                  values: Number(value.toFixed(fixed)),
                  result: Number(results[ri].toFixed(fixed)),
                  functionName: func.name,
                });
              } else if (resAxisKey === xAxis) {
                data.push({
                  values: Number(results[ri].toFixed(fixed)),
                  result: Number(value.toFixed(fixed)),
                  functionName: func.name,
                });
              }
            }
          }

          if (data.length > 0) {
            data.push({ ...data[0] });
          }
        } else {
          // Стандартная обработка
          for (let val = start; val <= end; val += step) {
            const variables = { ...func.axesArg, [mainAxisKey]: val } as AxisType;
            const value = variables[mainAxisKey];
            const results = await func.fn(variables);

            for (let res of results) {
              if (!valid(data, value, res, func.name)) continue;
              
              if (resAxisKey === yAxis) {
                data.push({
                  values: Number(value.toFixed(fixed)),
                  result: Number(res.toFixed(fixed)),
                  functionName: func.name,
                });
              } else if (resAxisKey === xAxis) {
                data.push({
                  values: Number(res.toFixed(fixed)),
                  result: Number(value.toFixed(fixed)),
                  functionName: func.name,
                });
              }
            }
          }
        }
      }
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [valid, xAxis, yAxis]);

  // Мемоизируем основную функцию
  const run = useCallback(async () => {
    // Проверяем, изменились ли зависимости
    const functionsChanged = JSON.stringify(functions) !== JSON.stringify(prevFunctionsRef.current);
    const stepChanged = step !== prevStepRef.current;
    const viewFilterChanged = viewFilter !== prevViewFilterRef.current;
    const xAxisChanged = xAxis !== prevXAxisRef.current;
    const yAxisChanged = yAxis !== prevYAxisRef.current;

    if (!functionsChanged && !stepChanged && !viewFilterChanged && !xAxisChanged && !yAxisChanged) {
      return;
    }

    setIsLoading(true);
    try {
      const promises = functions.map(func => generateFunctionData(func, step));
      const results = await Promise.all(promises);
      const newData = results.flat();
      setData(newData);
      
      // Обновляем ссылки на предыдущие значения
      prevFunctionsRef.current = functions;
      prevStepRef.current = step;
      prevViewFilterRef.current = viewFilter;
      prevXAxisRef.current = xAxis;
      prevYAxisRef.current = yAxis;
    } catch (error) {
      console.error(error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [functions, step, viewFilter, generateFunctionData, xAxis, yAxis]);

  useEffect(() => {
    run();
  }, [run]);

  return { data, isLoading };
};