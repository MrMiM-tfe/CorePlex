import { ISession } from "./session";
import { IUser } from "./user";

export{}

declare global {
    namespace Express {
      export interface Request {
        user?:IUser,
        session?: ISession
      }
    }
}