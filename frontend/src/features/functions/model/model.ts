import type { FunctionType, AxisType } from "./types";

export const defaultFunction:FunctionType = {
    name: "y=x",
    fn: async (variables: AxisType) => [variables.x],
    ranges: {
        y: [-10, 10],
        x: [-10, 10]
    },
    color: "#000000",
    axesFunc: "y",
    axesCount: ["x"],
    axesArg: {},
    step: 0.2
}