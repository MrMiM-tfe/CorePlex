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

export function GetRes(status: number,type: string = "Success", message: string = "success") : Res {
    const res: Res = {
        type,
        message,
        status
    }

    return res
}

// create content response
export function GetContent(
  content: Object,
  status: number = 200,
  type: string = "Success",
  message: string = "success"
) : Content {
  const res: Content = {
    type,
    content,
    message,
    status,
  };

  return res;
}

// create error response
export function GetError(
  message: string,
  status: number = 400,
  type: string = "Error",
  info: string = "no info"
) : Error {
  const res: Error = {
    type,
    message,
    status,
    info,
  };

  return res;
}
