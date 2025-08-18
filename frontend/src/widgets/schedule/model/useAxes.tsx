import { useEffect, useState } from "react";
import type { FunctionType } from "./types";

export const useAxes = (zoom = 1, defaultSize = 10) => {

  const [axes, setAxes] = useState<Array<FunctionType>>([
    {
      name: "x",
      fn: () => 0, // Горизонтальная линия (y = position[1])
      ranges: {
        x: [-defaultSize, defaultSize], // Диапазон для оси X
      },
      color: "#000",
      axesFunc: "x",
      axesArg: {},
      step: defaultSize,
    },
    {
      name: "y",
      fn: () => 0, // Вертикальная линия (x = position[0])
      ranges: {
        y: [-defaultSize, defaultSize], // Диапазон для оси Y
      },
      color: "#000",
      axesFunc: "y",
      axesArg: {},
      step: defaultSize,
    }
  ]);

  useEffect(() => {
    const scaledSize = defaultSize * zoom;

    const newAxes = axes.map(axis => {
      if (axis.name === "x") {
        return {
          ...axis,
          ranges: {
            x: [-scaledSize, scaledSize],
          },
          step: scaledSize,
        };
      } else {
        return {
          ...axis,
          ranges: {
            y: [-scaledSize, scaledSize],
          },
          step: scaledSize,
        };
      }
    });
    
    setAxes(newAxes);
  }, [zoom, defaultSize]);

  return { 
    axes
  };
};