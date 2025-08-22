import type { FunctionType, AxisType } from "./types";

export const defaultFunction:FunctionType = {
    name: "y=x",
    fn: (variables: AxisType) => [variables.x],
    ranges: {
    x: [-10, 10]
    },
    color: "blue",
    axesFunc: "x",
    axesArg: {},
    step: 0.2
}