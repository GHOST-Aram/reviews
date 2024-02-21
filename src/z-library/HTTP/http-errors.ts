import { Request, Response, NextFunction } from "express"
export class HTTPErrors{

    public handleUnknownUrls = ( req: Request, res: Response, next: NextFunction ) =>{
        res.status(404).json({ message: 'Resource not found' })
        
    }

    public handleServerErrors = ( 
        err:Error, req: Request, res: Response, next: NextFunction) =>{
            if(err){
                res.status(500).json({ message : 'Unexpected server error.'})
                console.log(`Name ${err.name}, Message:${err.message}`)
                console.log(`Error Stack \n ${err.stack}`)
            }
    }
}

export const httpErrors = new HTTPErrors()