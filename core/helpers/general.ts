import {IFullOptions} from "@/core/docs/core";
import swaggerJSDoc from "swagger-jsdoc";
import {EResultTypes, EStatusCodes, IPageData, IResultError, IResultType} from "../types/general";
import mongoose, {isValidObjectId} from "mongoose";

export function generatePaths(core: IFullOptions, paths: Object) {
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

    constructor(root: string, paths: swaggerJSDoc.Paths) {
        this.root = root
        this.paths = paths
    }

    getPaths(): swaggerJSDoc.Paths {
        const paths = {} as swaggerJSDoc.Paths

        for (let [key, value] of Object.entries(this.paths)) {
            paths[`/${this.root}${key}`] = value
        }

        return paths
    }
}


// generate single error result
export const errorResult = (name: string, message: string, status: EStatusCodes) => {
    const error: IResultError = {
        name,
        message,
        status
    }

    const res: IResultType = {
        type: EResultTypes.ERROR,
        message,
        status,
        errors: [error]
    }

    return res
}

// generate success result
export const successResult = (data: Object | Object[], message: string = "success", status: EStatusCodes = EStatusCodes.SUCCESS, pageData?: IPageData) => {
    const res: IResultType = {
        type: EResultTypes.SUCCESS,
        status,
        message,
        data,
        pageData
    }
    return res
}

export const findDocByIdentity = async (identity: string, model: mongoose.Model<any>, populate:string = "") => {
    const identityType = checkIdentity(identity)

    try {
        switch (identityType) {
            case "slug":
                return await model.findOne({slug: identity}).populate(populate);
            case "id":
                return await model.findById(identity).populate(populate);
            default:
                return null;
        }
    } catch (error) {
        return null;
    }
}

export function checkIdentity(identity: string) {
    let identityType = "slug";
    if (isValidObjectId(identity)) {
        identityType = "id";
    }

    return identityType;
}

export function getPageData(page: number, limit: number, totalData: number) {
    const totalPages = Math.ceil(totalData / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    const pageData: IPageData = {
        totalPages,
        nextPage,
        prevPage
    }

    return pageData
}

export function ConvertToNaturalNumber(num: number) {
    num = Math.abs(Math.floor(num))
    return num === 0 ? 1 : num
}