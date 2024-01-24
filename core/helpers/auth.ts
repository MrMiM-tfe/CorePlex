import { ERole, IUser } from "../types/user";

export const editPermission = (user: IUser) => {
    return (user.role === ERole.SELLER || user.role === ERole.ADMIN)
}

export const RoleToValue = (role?:ERole) => {
    switch (role) {
        case ERole.ADMIN:
            return 0
        case ERole.SELLER:
            return 10
        case ERole.GEST:
            return 100
        default:
            return 999
    }
}

export const permissionsCheck = (permNeeded?: ERole, perm?:ERole) => {
    return (RoleToValue(perm) <= RoleToValue(permNeeded))
}