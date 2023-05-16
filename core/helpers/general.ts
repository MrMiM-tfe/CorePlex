import {IFullOptions} from "@/core/docs/core";
import swaggerJSDoc from "swagger-jsdoc";

export function generatePaths(core :  IFullOptions, paths:Object) {
    for (let [key, path] of Object.entries(paths)) {
        core.swaggerDefinition.paths = {
            ...core.swaggerDefinition.paths,
            ...(new Paths(key, path)).getPaths()
        }
    }
}

export class Paths {
    root: string;
    paths: swaggerJSDoc.Paths;
    constructor(root:string, paths:swaggerJSDoc.Paths) {
        this.root = root
        this.paths = paths
    }

    getPaths():swaggerJSDoc.Paths {
        const paths = {} as swaggerJSDoc.Paths

        for (let [key, value] of Object.entries(this.paths)) {
            paths[`/${this.root}${key}`] = value
        }

        return paths
    }
}