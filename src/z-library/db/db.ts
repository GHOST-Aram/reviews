import mongoose, { Schema } from "mongoose"

export class DB{
    private connection: mongoose.Connection
    constructor(connection : mongoose.Connection){
        this.connection = connection
    }

    public createModel = ( modelName:string, schema: Schema<any>
        ): mongoose.Model<any>  =>{
            const Model = this.connection.model<any>(modelName, schema)
    
            return Model
    }

}

