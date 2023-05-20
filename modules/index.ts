import express from "express"
const router = express.Router()
import {generatePaths} from "@/core/helpers/general";
import docs from "@/core/docs/core"

let docList: { [p: string]: any } = {};

// Products:
import product from "./products"
router.use("/product", product.routes)
docList["product"] = product.docs.paths

generatePaths(docs, docList)
export default {router, docs}