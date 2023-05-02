// signup messages
export enum ESignupMSG {
    SUCCESS = "success full signup",
    ROLE_RESTRCTION = "role restriction use can not use admin role",
    INVALID_ROLE = "role must be (user/seller)",
    IN_USE_USERNAME = "in use username",
    IN_USE_EMAIL = "in use email",
    IN_USE_PHONE = "in use phone",
    WEAK_PASSWORD = "weak password",
    SHORT_PASSWORD = "short password",
    SERVER_ERROR = "server error",
    OTHER = "other"
}

// login messages
export enum ELoginMSG {
    SUCCESS = "success full logedin",
    EMPTY_USERNAME = "username field is empty",
    EMPTY_PASSWORD = "password field is empty",
    WRONG_INFO = "username or password is incorrect",
    SERVER_ERROR = "server error",
    OTHER = "other"
}

// logout messages
export enum ELogoutMSG {
    SUCCESS = "loged out",
    SERVER_ERROR = "server error",
    OTHER = "other"
}

// loginCheck messages
export enum ELoginCheckMSG {
    SUCCESS = "user is loged in",
    TOKEN_NOT_FOUND = "token not found",
    TOKEN_NOT_VERIFIED = "token not verified",
    USER_NOT_FOUND = "The user belonging to this token does no longer exist",
    SESSION_NOT_FOUND = "The session not found",
    PASSWORD_CHANGED = "User recently changed password! Please login again",
}