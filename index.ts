import express, { Express, Response, Request} from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from "dotenv"
import routes from "./routes"
import mongoose from "mongoose";
import config from "./core/config";
import modules from "./modules/index";

dotenv.config()

const port = process.env.PORT ?? 8000;
const dburi = "mongodb://127.0.0.1:27017/atsdb";

const app: Express = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const specs = swaggerJSDoc(modules.docs);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(routes)

mongoose.connect(dburi).then((result) => {
    app.listen(config.server.port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    })
}).catch((error) => {
    console.log(error);
    
})