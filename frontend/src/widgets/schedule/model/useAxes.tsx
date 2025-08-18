import { useCallback, useEffect, useState } from "react";
import type { FunctionType } from "./types";

export const useAxes = (
  zoom:number = 1,
  size: number = 10
) => {
  
  const [axes, setAxes] = useState<Array<FunctionType>>([]);

  useEffect(() => {
    const scaledSize = size * zoom;

    const x:FunctionType = {
      name: "x",
      fn: () => [0],
      ranges: {
        x: [-scaledSize, scaledSize],
      },
      color: "#000",
      axesFunc: "x",
      axesArg: {},
      step: scaledSize,
    }

    const y:FunctionType = {
      name: "y",
      fn: () => [0],
      ranges: {
        y: [-scaledSize, scaledSize],
      },
      color: "#000",
      axesFunc: "y",
      axesArg: {},
      step: scaledSize,
    }
    
    setAxes([x,y]);
  }, [zoom, size]);


  const viewFilter = useCallback((values:number, result:number) => {
    const scaledSize = size * zoom;

    if(-scaledSize <= values && values <=scaledSize)
      if(-scaledSize <= result && result <=scaledSize)
        return true;
    return false;
  }, [zoom, size]);

  return { 
    axes,
    viewFilter
  };
};