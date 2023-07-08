import express from "express"
const router = express.Router()
import {generatePaths} from "@/core/helpers/general";
import docs from "@/core/docs/core"

let docList: { [p: string]: any } = {};

// safe imports
(async() => {
    
    // Products:
    try {
        const product = await import("./products")
        
        router.use("/product", product.default.routes)
        docList["product"] = product.default.docs.paths
    } catch (error) {
        console.log(error);
    }

})()

generatePaths(docs, docList)
export default {router, docs}