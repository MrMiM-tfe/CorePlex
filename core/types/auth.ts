import { Response } from "express"

// types
import { EResultTypes } from "./general"
import { IUser } from "./user"
import { IToken } from "./token"

// messages
import { ELoginCheckMSG, ELoginMSG, ELogoutMSG, ESignupMSG } from "../messages/auth"


// Signup Types ############################################################

// type that return on auth service for signup
export interface ISignupResult {
    type: EResultTypes,
    message: ESignupMSG ,
    status: number,
    user?: IUser ,
    token?: IToken
}

// function to create success respons
function signupSuccess (user: IUser, token: IToken): ISignupResult {
    const res: ISignupResult = {
        type: EResultTypes.SUCCESS,
        message: ESignupMSG.SUCCESS,
        status: 201,
        user,
        token
    }

    return res
}

// create error respons
function signupError(message: ESignupMSG, status: number): ISignupResult{
    const res: ISignupResult = {
        type: EResultTypes.ERROR,
        message,
        status
    }

    return res
}

export const SignupResult = {
    success: signupSuccess,
    error: signupError,
}


// Signup Responses -------------------------------------------
export interface ISignupResponse extends ISignupResult {

}

// create success responses
function ResponseSuccess(res: Response, result: ISignupResult) {
    const respons : ISignupResponse = {
        ...result
    }

    return res.status(respons.status).json(respons)
}


// create error responses
function ResponseError(res: Response, message: ESignupMSG) {
    const respons: ISignupResponse = {
        type: EResultTypes.ERROR,
        message,
        status: 400
    }

    return res.status(respons.status).json(respons)
}

export const SignupResponse = {
    success: ResponseSuccess,
    error: ResponseError
}

// Login Types ############################################################

// type that return on auth service for login
export interface ILoginResult {
    type: EResultTypes,
    message: ELoginMSG ,
    status: number,
    user?: IUser ,
    token?: IToken
}

// function to create success respons for login
function loginSuccess (user: IUser, token: IToken): ILoginResult {
    const res: ILoginResult = {
        type: EResultTypes.SUCCESS,
        message: ELoginMSG.SUCCESS,
        status: 201,
        user,
        token
    }

    return res
}

// create error respons
function loginError(message: ELoginMSG, status: number): ILoginResult{
    const res: ILoginResult = {
        type: EResultTypes.ERROR,
        message,
        status
    }

    return res
}

export const LoginResult = {
    success: loginSuccess,
    error: loginError,
}

// Login Responses -------------------------------------------
export interface ILoginResponse extends ILoginResult {

}

// create success responses for login
function LoginResSuccess(res: Response, result: ILoginResult) {
    const respons : ILoginResponse = {
        ...result
    }

    return res.status(respons.status).json(respons)
}


// create error responses for login
function LoginResError(res: Response, message: ELoginMSG) {
    const respons: ILoginResponse = {
        type: EResultTypes.ERROR,
        message,
        status: 400
    }

    return res.status(respons.status).json(respons)
}

export const LoginResponse = {
    success: LoginResSuccess,
    error: LoginResError
}


// Login Check ############################################################
export interface ILoginCheckResult {
    type: EResultTypes,
    message: string,
    status?: number
}

const LoginCheckSuccess = () => {
    const res:ILoginCheckResult = {
        type: EResultTypes.SUCCESS,
        message: ELoginCheckMSG.SUCCESS
    }

    return res
}

const LoginCheckError = (message:ELoginCheckMSG, status: number) => {
    const res:ILoginCheckResult = {
        type: EResultTypes.ERROR,
        message,
        status
    }

    return res
}

export const LoginCheckResult = {
    success: LoginCheckSuccess,
    error: LoginCheckError
}

// logout Types ############################################################
export interface ILogoutResult {
    type: EResultTypes,
    message:string,
    status: number
}

const LogoutSuccess = () => {
    const res:ILogoutResult = {
        type: EResultTypes.SUCCESS,
        message: ELogoutMSG.SUCCESS,
        status: 200
    }
    
    return res
}

const LogoutError = (message: ELogoutMSG, status: number) => {
    const res:ILogoutResult = {
        type: EResultTypes.ERROR,
        message,
        status
    }

    return res
}

export const LogoutResult = {
    success: LogoutSuccess,
    error: LogoutError
}
// logout response --------------------------------------------------------
export interface ILogoutResponse extends ILogoutResult {}

const LogoutSuccessRes = (res:Response, result:ILogoutResult) => {
    const resp:ILogoutResponse = {
        ...result
    }

    return res.status(resp.status).json(resp)
}

const LogoutErrorRes = (res:Response, message:ELogoutMSG, status: number = 500) => {
    const resp:ILogoutResponse = {
        type : EResultTypes.ERROR,
        message,
        status
    }

    return res.status(status).json(resp)
}

export const LogoutResponse = {
    success: LogoutSuccessRes,
    error: LogoutErrorRes,
}