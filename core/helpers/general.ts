import {IFullOptions} from "@/core/docs/core";
import swaggerJSDoc from "swagger-jsdoc";
import {EResultTypes, EStatusCodes, IPageData, IResultError, IResultType, Result} from "../types/general";
import mongoose, {isValidObjectId} from "mongoose";
import slugify from "slugify";
import { TypedResult } from "../types/Result";

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

// generate errors result
export const errorsResult = (errs: IResultError[] | IResultError, status: EStatusCodes) => {
    const errors = Array.isArray(errs) ? errs : [errs];

    const res: IResultType = {
        type: EResultTypes.ERROR,
        errors,
        status,
    };

    return res;
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

export async function GenerateSlug(doc: any, model: mongoose.Model<any, {}, {}, {}, any>) {
    // check if slug is modified by user or not
    if (!ValidateSlug(doc.slug)) {
        doc.slug = slugify(doc.name)
    }

    const similar = await model.findOne({slug: doc.slug})
    if (!similar) return doc.slug as string

    const regexPattern = new RegExp(`^${doc.slug}-\\d+$`)

    const data = (await model.find({slug: regexPattern}).sort("-slug").limit(1))[0]
    
    if (data) {
        // get latest counter number
        const count = data.slug.split("-").pop()

        // generate next counter number
        const StrNumber = !isNaN(Number(count)) ? (Number(count) + 1).toString() : "1"

        // concatenate slug with number
        doc.slug = doc.slug + "-" + StrNumber
    }else {
        doc.slug = doc.slug + "-1"
    }

    return doc.slug as string
}

/**
 * @description validate slug
 */
export function ValidateSlug(slug: string) {
    
    if (!slug) return false
    
    const regexExp = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
    return regexExp.test(slug)
}

export function handleModelErrors(error: any) {
    console.log(error);


    if (error.name === "ValidationError") {
        let errors: IResultError[] = [];

        Object.keys(error.errors).forEach((key) => {
            let err: IResultError = {
                name: key,
                message: error.errors[key].message,
                status: EStatusCodes.CONFLICT,
            };
            errors.push(err);
        });

        return Result.errors(errors, EStatusCodes.CONFLICT);
    } else if (error.code === 11000) {
        let errors: IResultError[] = [];

        Object.keys(error.keyValue).forEach((key) => {
            let err: IResultError = {
                name: key,
                message: `'${key}' must be unique. value of '${error.keyValue[key]}' is in use`,
                status: EStatusCodes.CONFLICT,
            };
            errors.push(err);
        });

        return Result.errors(errors, EStatusCodes.CONFLICT);
    }

    const err: IResultError = {
        name: "Server Error",
        message: "some thing went wrong",
        status: EStatusCodes.SERVER_ERROR,
    };

    return Result.errors(err, err.status);
}