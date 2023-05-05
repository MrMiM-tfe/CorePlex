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