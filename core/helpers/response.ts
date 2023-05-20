export interface Res {
    type: string;
    message: string;
    status: number;
}

export interface Content extends Res {
    content: Object;
}

export interface Error extends Res {
    info: string;
}

export function GetRes(status: number, type: string = "Success", message: string = "success"): Res {
    return {
        type,
        message,
        status
    }
}

// create content response
export function GetContent(
    content: Object,
    status: number = 200,
    type: string = "Success",
    message: string = "success"
): Content {
    return {
        type,
        content,
        message,
        status,
    };
}

// create error response
export function GetError(
    message: string,
    status: number = 400,
    type: string = "Error",
    info: string = "no info"
): Error {
    return {
        type,
        message,
        status,
        info,
    };
}
