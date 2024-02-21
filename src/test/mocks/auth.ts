import { NextFunction, Response, Request } from "express";
import { Authenticatable } from "../../z-library/auth/auth";
class Authenticator implements Authenticatable{

    public authenticate = () =>{
        return (req: Request, res: Response, next: NextFunction) =>{
            const user = { _id: '64c9e4f2df7cc072af2ac9e8', isAdmin: true}
        
            req.user = user
            req.isAuthenticated = () => Boolean(req.user)
            next()
        }
    }
    
    public allowAdminUser = (req: Request, res: Response, next: NextFunction) =>{
        const user:any = req.user
        if(user.isAdmin){
            next()
        } else{ res.status(403).json({message: 'Forbidden'})}
    }
}

export const authenticator = new Authenticator()