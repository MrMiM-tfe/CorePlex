import express from "express"
const router = express.Router()
import {generatePaths} from "@/core/helpers/general";
import docs from "@/core/docs/core"

let docList: { [p: string]: any } = {};

// safe imports
const init = async () => {
    
    // Products:
    try {
        const product = await import("./products")
        
        router.use("/product", product.default.routes)
        docList["product"] = product.default.docs.paths
    } catch (error) {
        console.log(error);
    }

    // Articles:
    try {
        const article = await import("./articles")
        
        router.use("/article", article.default.routes)
        docList["article"] = article.default.docs.paths
    } catch (error) {
        console.log(error);
    }
    
    generatePaths(docs, docList)
    return {router, docs}
}

export default init