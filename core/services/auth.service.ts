// Models
import User from "../models/User"

// types
import {IRegisteringUser, ERole, IUser} from "../types/user"
import {LoginResult, LogoutResult, SignupResult} from "../types/auth"

// messages
import {ELoginMSG, ELogoutMSG, ESignupMSG} from "../messages/auth"

// services
import {generateAuthToken} from '../services/token.service'
import {ISession} from "../types/session"
import Session from "../models/Session"

export const signupService = async (userData: IRegisteringUser) => {

    // Make admin role forbidden
    if (userData.role === ERole.ADMIN) {
        return SignupResult.error(ESignupMSG.ROLE_RESTRICTION, 400)
    }

    // check if it is first user to set role as "admin"
    const user_count = await User.countDocuments()
    if (user_count === 0) {
        userData.role = ERole.ADMIN
    }

    try {
        // save user in DB
        const user: IUser = await User.create(userData)

        // generate token for user
        const token = await generateAuthToken(user)

        // clear password
        user.password = "";

        // create and return result
        return SignupResult.success(user, token)

    } catch (error) {
        console.log(error);
        return SignupResult.error(ESignupMSG.SERVER_ERROR, 500)
    }
}

export const loginService = async (username: string, password: string) => {

    // check if username and password are not empty
    if (!username) return LoginResult.error(ELoginMSG.EMPTY_USERNAME, 400)
    if (!password) return LoginResult.error(ELoginMSG.EMPTY_PASSWORD, 400)

    try {
        // get user with username and get password of user
        const user = await User.findOne({username}).select("+password")

        // check user
        if (!user) return LoginResult.error(ELoginMSG.WRONG_INFO, 400)

        // check password
        const isMach = await user.isPasswordMatch(password)
        if (!isMach) return LoginResult.error(ELoginMSG.WRONG_INFO, 400)

        // generate token
        const token = await generateAuthToken(user)

        user.password = ""

        return LoginResult.success(user, token)
    } catch (error) {
        console.log(error);
        return LoginResult.error(ELoginMSG.SERVER_ERROR, 500)
    }
}

export const logoutService = async (session: ISession) => {

    try {
        // delete session
        await Session.findByIdAndDelete(session._id)

        return LogoutResult.success()
    } catch (error) {
        console.log(error);
        return LogoutResult.error(ELogoutMSG.SERVER_ERROR, 500)
    }
}