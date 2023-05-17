import jwt from "jsonwebtoken"
import {IUser} from "../types/user"
import {IToken} from "../types/token"
import {ESessionTypes, ISessionCreate} from "../types/session"
import Session from "../models/Session"
import config from "../config"

export const generateToken = async (userId: string, expires: number, type: ESessionTypes) => {

    const secret = config.jwt.secret

    const SessionData: ISessionCreate = {
        user: userId,
        expires,
        type
    }

    const session = await Session.create(SessionData)

    const payload = {
        sub: userId,
        jti: session.id,
        iat: Date.now(),
        exp: expires,
        type
    }

    const TokenStr = jwt.sign(payload, secret)

    const token: IToken = {
        token: TokenStr,
        session: session.id,
        user: userId,
        expires,
        type
    }

    return token
}

const generateExpiration = (expirationDays: number) => {
    const date = new Date()
    date.setHours(date.getHours() + 24 * expirationDays)
    return date.getTime()
}

export const generateAuthToken = async (user: IUser) => {
    const accessTokenExpires = generateExpiration(7)

    return generateToken(
        user._id.toString(),
        accessTokenExpires,
        ESessionTypes.ACCESS
    )
}