import express, { Application } from "express"
import { authenticator } from "../z-library/auth/auth"
import { Server } from "../z-library/server/server"
import 'dotenv/config'
import { Connection } from "../z-library/db/connection"

const app: Application = express()
const server = new Server(app)

server.useJSONPayloads()
server.allowCrossOriginResourceSharing()
server.enforceSecurity()
server.logRequestsandResponses()

const dbUri = process.env.USERSDB_URI || ''
const secretOrKey = process.env.TOKEN_SECRET
let connection: Connection

try {
    
    connection = new Connection(dbUri)
    
    const authDbConnection = connection.getInitial()
    
    if(secretOrKey){
        authenticator.configureStrategy(secretOrKey, authDbConnection)
        authenticator.initialize(app)
    } else {
        console.log(
            'Secret Key is Undefined. '
            +'Please provide all of them in enviroment variables')
    }
} catch (error: any) {
    console.log(error.message)
}

const PORT = Number(process.env.REVIEWS_PORT) || 3500
server.listenToRequests(PORT, 'Reviews')

export { app, connection }

