import dotenv from "dotenv"

const env = process.env

dotenv.config({path: ".env"})

const config = {
    server: {
        port: env['PORT'] ?? 3000,
    },
    jwt: {
        secret:env["SECRET"] ?? "test",
        accessExpirationDays: env["JWT_ACCESS_EXPIRATION_DAYS"] ? parseInt(env["JWT_ACCESS_EXPIRATION_DAYS"]): 7
    }
}

console.log(config);

export default config