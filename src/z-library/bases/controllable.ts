import { NextFunction, Request, Response } from "express";

export interface Controllable{
    addNew: (req: Request, res: Response, next: NextFunction) => Promise<void> 
    getOne: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getMany: (req: Request, res: Response, next: NextFunction) => Promise<void>
    updateOne: (req: Request, res: Response, next: NextFunction) => Promise<void>
    modifyOne: (req: Request, res: Response, next: NextFunction) => Promise<void>
    deleteOne: (req: Request, res: Response, next: NextFunction) => Promise<void>
}