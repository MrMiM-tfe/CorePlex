import { NextFunction, Request, Response } from "express";
import { LoginCheckResult } from "../types/auth";
import { ELoginCheckMSG } from "../messages/auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import Session from "../models/Session";
import User from "../models/User";
import { EResultTypes, NoPermissionResponse } from "../types/general";
import { ERole } from "../types/user";

const loginCheck = async (req: Request) => {

    // get token
    const token = req.headers.token

    if (!token) return LoginCheckResult.error(ELoginCheckMSG.TOKEN_NOT_FOUND, 401)

    // Token verification
    try {
        var decoded = await jwt.verify(token as string, config.jwt.secret) as JwtPayload
    } catch (error) {
        return LoginCheckResult.error(ELoginCheckMSG.TOKEN_NOT_VERIFIED, 401)
    }

    // Extract session data from database
    const session = await Session.findById(decoded.jti)
    // check session
    if (!session) return LoginCheckResult.error(ELoginCheckMSG.SESSION_NOT_FOUND, 401)
    
    // Extract user data from database
    const currentUser = await User.findById(decoded.sub)
    // check user
    if (!currentUser) return LoginCheckResult.error(ELoginCheckMSG.USER_NOT_FOUND, 401)

    req.user = currentUser
    req.session = session

    return LoginCheckResult.success()
}

export const protect = async (req: Request, res:Response, next: NextFunction) => {

    const result = await loginCheck(req)

    if (result.type === EResultTypes.ERROR) return NoPermissionResponse(res)

    next()
}

export const adminCheck = async (req: Request, res:Response, next: NextFunction) => {

    if (!req.user) {
        const result = await loginCheck(req)
        if (result.type === EResultTypes.ERROR) return NoPermissionResponse(res)
    }
        
    if (req.user?.role !== ERole.ADMIN) return NoPermissionResponse(res, "you are not admin")

    next()
}

export const sellerCheck = async (req: Request, res:Response, next: NextFunction) => {

    if (!req.user){
        const result = await loginCheck(req)
        if (result.type === EResultTypes.ERROR) return NoPermissionResponse(res)
    }

    if (req.user?.role !== ERole.SELLER && req.user?.role !== ERole.ADMIN) return NoPermissionResponse(res, "you are not seller")

    next()
}