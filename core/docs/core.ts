import swaggerJSDoc from 'swagger-jsdoc';

// schemas
const User = {
    type: "object",
    properties:{
        name:{
            type:"string"
        },
        username:{
            type:"string"
        }
    }
}

const schemas = {
    User    
}

const jsonContent = (schema:string) => {
    return {"application/json": {schema: {$ref: `#/components/schemas/${schema}`}}}
}

export interface IFullOptions extends  swaggerJSDoc.OAS3Options {
    swaggerDefinition:  swaggerJSDoc.OAS3Definition
}

const options: IFullOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            version: "1.0.0",
            title: "CorePlex",
            description: "powered by ATS Team",
        },
        paths:{
            "/auth/signup":{
                post:{
                    requestBody:{
                        content: jsonContent("User")
                    }
                },
            }
        },
        servers:[
            {
                url:"http://localhost:3000",
            }
        ],
        components: {
            schemas,
        },
        
        
    },
    apis:[]
}

export default options