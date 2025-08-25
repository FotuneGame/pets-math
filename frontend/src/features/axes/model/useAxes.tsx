import { useCallback, useEffect, useState } from "react";
import type { FunctionType } from "../../../widgets/schedule/model/types";

export const useAxes = (
  defaultXAxis: string, 
  defaultYAxis: string,
  zoom:number = 1,
  size: number = 10
) => {
  
  const [xAxis, setXAxis] = useState<string>(defaultXAxis);
  const [yAxis, setYAxis] = useState<string>(defaultYAxis);
  const [axes, setAxes] = useState<Array<FunctionType>>([]);

  useEffect(() => {
    const scaledSize = size * zoom;

    const x:FunctionType = {
      name: xAxis,
      fn: () => [0],
      ranges: {
        [xAxis]: [-scaledSize, scaledSize],
        [yAxis]: [-scaledSize, scaledSize],
      },
      color: "#000",
      axesFunc: yAxis,
      axesCount: [xAxis],
      axesArg: {},
      step: scaledSize,
    }

    const y:FunctionType = {
      name: yAxis,
      fn: () => [0],
      ranges: {
        [xAxis]: [-scaledSize, scaledSize],
        [yAxis]: [-scaledSize, scaledSize],
      },
      color: "#000",
      axesFunc: xAxis,
      axesCount: [yAxis],
      axesArg: {},
      step: scaledSize,
    }

    setAxes([x,y]);
  }, [xAxis, yAxis, zoom, size]);


  const viewFilter = useCallback((values:number, result:number) => {
    const scaledSize = size * zoom;

    if(-scaledSize <= values && values <=scaledSize)
      if(-scaledSize <= result && result <=scaledSize)
        return true;
    return false;
  }, [zoom, size]);

  return { 
    axes,
    viewFilter,
    x: [xAxis, setXAxis],
    y: [yAxis, setYAxis]
  };
};