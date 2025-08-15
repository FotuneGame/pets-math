import type {ProviderType} from "@shared/types/provider";
import {RouterProvider as Router} from "react-router-dom";
import {router} from "./model";



export const RouterProvider = ({children}: ProviderType) => {
    return(
        <Router router={router}>
            {children}
        </Router>
    )
}