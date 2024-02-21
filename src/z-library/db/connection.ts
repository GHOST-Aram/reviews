import mongoose from "mongoose"

export class Connection {

    private initialConnection: mongoose.Connection

    constructor(intialDbUri: string){
        this.initialConnection = mongoose.createConnection(intialDbUri)
        
        this.initialConnection.on('error', (error) => {
            if(error){
                console.log('Database connection failed')
            }
        })

        process.on('unhandledRejection', (reason: any, Promise) =>{
            console.log('Reason for failure - ', reason.stack)
        })

        this.initialConnection.on('connected', () => {
            console.log('Application Connected to Database')
        })
    }

    public getInitial = (): mongoose.Connection =>{
        return this.initialConnection
    }

    public switch = (newdBName: string): mongoose.Connection =>{
        return this.initialConnection.useDb(newdBName)
    }
}