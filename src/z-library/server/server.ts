import express, { Application } from "express"
import cors from 'cors'
import helmet from "helmet"
import mongoose from "mongoose"
import morgan from 'morgan'

export class Server{

    private app:Application
    constructor(app: Application){
        this.app = app
    }

    public useJSONPayloads = () =>{
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json())

    }

    public allowCrossOriginResourceSharing = () =>{
        this.app.use(cors())
    }

    public enforceSecurity = () =>{
        this.app.use(helmet())
    }

    public logRequestsandResponses = () =>{
        this.app.use(morgan('dev'))
    }

    public listenToRequests = (port: number, appName: string) =>{
        this.app.listen(port, () =>{
            console.log(`Running ${appName} on http://localhost:${port}`)
        })
    }

    public switchDbConnection = (dbName: string) =>{
        
    }

}