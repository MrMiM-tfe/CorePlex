import { Response, Request } from "express";
import { GetContent } from "../../helpers/response";

function index(req: Request, res: Response) {
    res.json(GetContent({site: "ats"}))
}

export default {
    index
}