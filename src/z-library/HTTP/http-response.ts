import { Response, Request, NextFunction } from "express"
import { HydratedDocument } from "mongoose"

export class HttpResponse{

    public respondWithMethodNotAllowed = (req: Request, res: Response) =>{
        res.status(405).json({ message: 'Method not allowed' })
    }

    public respondWithConflict = (res: Response) =>{
        res.status(409).json({message: 'Document already exists'})
    }

    public respondWithCreatedResource = (resourceId: string, res: Response) =>{
        res.location(`/carts/${resourceId}`)
        res.status(201).json({ message: 'Created'})
    }

    public respondWithFoundResource = (
        resource: HydratedDocument<any>[]| HydratedDocument<any>, 
        res: Response
        ) =>{
            res.status(200).json({ resource })
    }

    public paginate = (req: Request): Paginator =>{
        const paginator = {
            skipDocs: 0,
            limit: 10
        }

        const page = Math.abs(Number(req.query.page))
        const limit = Math.abs(Number(req.query.limit))

        if(page && limit){
            paginator.skipDocs = (page - 1) * limit
            paginator.limit = limit
        }

        return paginator
    }

    public respondWithNotFound = (res: Response) =>{
        res.status(404).json({ message: 'Resource not Found'})
    }

    public respondWithModifiedResource = (resourceId: string, res: Response) =>{
        res.location(`/carts/${resourceId}`)
        res.status(200).json({ message: 'Modified' })
    } 

    public respondWithUpdatedResource = (resourceId: string, res: Response) =>{
        res.location(`/carts/${resourceId}`)
        res.status(200).json({ message: 'Updated' })
    }

    public respondWithDeletedResource = (id: string, res: Response) =>{
        res.status(200).json({ message: 'Deleted',id })
    }

    public respondWithUnauthorised = (res: Response) =>{
        res.status(401).json({ message: 'Unauthorised' })
    }

    public respondWithForbidden = (res: Response) =>{
        res.status(403).json({ message: 'Forbidden' })
    }

    public respondWithToken = (token: string, res: Response) =>{
        res.status(200).json({ token })
    }
}

export interface Paginator{
    skipDocs: number,
    limit: number
}