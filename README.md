# CorePlex

## How to use modules
To use module you must clone module repositorie to `modules` folder in main code and then import them in loader.

To import them module you must import it in `modules/index.ts` like this example :
```ts
// ...............
// safe imports
(async() => {
    
    // Products:
    try {
        const product = await import("./products")
        
        router.use("/product", product.default.routes) // load routes
        docList["product"] = product.default.docs.paths // load documents
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

})()

generatePaths(docs, docList)
export default {router, docs}
```
