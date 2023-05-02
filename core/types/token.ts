import { ESessionTypes } from "./session"

export enum ETokenTypes {
    ACCESS = 'access',
    REFRESH = 'refresh',
    RESET_PASSWORD = 'resetPassword',
    VERIFY_EMAIL = 'verifyEmail'
}

export interface IToken {
    token: string,
    user: string,
    session: string
    expires: number,
    type: ESessionTypes
}