import {Response} from "express"
import { ECoreMSG } from "../messages/general"
import { errorResult, successResult } from "../helpers/general"


export enum EResultTypes {
    SUCCESS = "Success",
    ERROR = "Error"
}

export interface IResultError {
    name: string,
    message: string,
    status: number
}

export enum EStatusCodes {
    SUCCESS = 200,
    SUCCESS_CREATE = 201,
    SERVER_ERROR = 500,
    CONFLICT = 409,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    FORBIDDEN = 403
}

export interface IPageData {
    totalPages: number,
    nextPage: number | null,
    prevPage: number | null
}

// Response Types ############################################################
export interface IResponse extends IResultType {
}

export const NoPermissionResponse = (res: Response, message: string = "no permission") => {
    const resp: IResponse = {
        type: EResultTypes.ERROR,
        message,
        status: EStatusCodes.UNAUTHORIZED
    }

    return res.status(401).json(resp)
}

// Result types ##############################################################

export interface IResultType {
    status: EStatusCodes,
    type: EResultTypes,
    message?: string,
    data?: Object | Object[],
    pageData?: IPageData,
    errors?: IResultError[]
}


export const Result = {
    error: errorResult,
    success: successResult
}

export const SendResponse = (res: Response, result: IResultType, {message, status}: {
    message?: string,
    status?: EStatusCodes
}) => {
    const resp: IResponse = {
        ...result,
        message: message ?? result.message,
        status: status ?? result.status,
    }

    return res.status(resp.status).json(resp)

}