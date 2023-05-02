import { Request, Response } from "express";
import { loginService, logoutService, signupService } from "../services/auth.service";
import { ERole, IRegisteringUser } from "../types/user";
import { LoginResponse, LogoutResponse, SignupResponse } from "../types/auth";
import { ELoginMSG, ELogoutMSG, ESignupMSG } from "../messages/auth";
import { ISession } from "../types/session";

const signup = async (req: Request, res: Response) => {
  try {
    // validate roles
    if (!Object.values(ERole).includes(req.body?.role)) {
      return SignupResponse.error(res, ESignupMSG.INVALID_ROLE);
    }

    // create registering user
    const user: IRegisteringUser = {
      ...req.body,
      role: req.body?.role as ERole,
    };

    // register user
    const result = await signupService(user);

    // send response
    return SignupResponse.success(res, result);
  } catch (error) {
    console.log(error);
    return SignupResponse.error(res, ESignupMSG.SERVER_ERROR);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    // login user
    const result = await loginService(
      req.body?.username,
      req.body?.password,
    )
    
    // send response
    return LoginResponse.success(res, result)
  } catch (error) {
    console.log(error);
    return LoginResponse.error(res, ELoginMSG.SERVER_ERROR)
  }
}

const logout = async (req: Request, res: Response) => {
  try {
    const result = await logoutService(req.session as ISession)

    return LogoutResponse.success(res, result)
  } catch (error) {
    console.log(error);
    return LogoutResponse.error(res, ELogoutMSG.SERVER_ERROR)
  }
}

export default {
  signup,
  login,
  logout
};
