import {IFullOptions} from "@/core/docs/core";
import swaggerJSDoc from "swagger-jsdoc";
import { EResultTypes, EStatusCodes, IPageData, IResultError, IResultType } from "../types/general";

export function generatePaths(core :  IFullOptions, paths:Object) {
    for (let [key, path] of Object.entries(paths)) {
        core.swaggerDefinition.paths = {
            ...core.swaggerDefinition.paths,
            ...(new Paths(key, path)).getPaths()
        }
    }
}

export class Paths {
    root: string;
    paths: swaggerJSDoc.Paths;
    constructor(root:string, paths:swaggerJSDoc.Paths) {
        this.root = root
        this.paths = paths
    }

    getPaths():swaggerJSDoc.Paths {
        const paths = {} as swaggerJSDoc.Paths

        for (let [key, value] of Object.entries(this.paths)) {
            paths[`/${this.root}${key}`] = value
        }

        return paths
    }
}


// generate single error result
export const errorResult = (name: string, message: string, status: EStatusCodes) => {
    const error : IResultError = {
        name,
        message,
        status
    }

    const res : IResultType = {
        type: EResultTypes.ERROR,
        message,
        status,
        errors: [error]
    }

    return res
}

// generate success result
export const successResult = (data: Object | Object[], message:string = "success", status: EStatusCodes = EStatusCodes.SUCCESS, pageData?: IPageData) => {
    const res: IResultType = {
        type: EResultTypes.SUCCESS,
        status,
        message,
        data,
        pageData
    }
    return res
}