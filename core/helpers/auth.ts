import { ERole, IUser } from "../types/user";

export const editPermission = (user: IUser) => {
    return (user.role === ERole.SELLER || user.role === ERole.ADMIN)
}