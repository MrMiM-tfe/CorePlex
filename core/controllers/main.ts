import { Response, Request } from "express";
import { GetContent } from "@/core/helpers/response";

function index(req: Request, res: Response) {
    res.json(GetContent({site: "ats"}))
}

export default {
    index
}