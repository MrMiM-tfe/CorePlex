import { Response } from "express"


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
export interface IResponse {
    type: EResultTypes,
    message: string,
    status: number
}

export const NoPermissionResponse = (res:Response, message: string = "no permission") => {
    const resp: IResponse = {
        type: EResultTypes.ERROR,
        message,
        status: 401
    }

    return res.status(401).json(resp)
}