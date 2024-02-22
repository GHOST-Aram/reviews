import { 
    ValidationChain, body, param, validationResult 
} from "express-validator"
import { isValidObjectId } from "mongoose"
import { formatter } from "../formatting/formatter"
import { Request, Response, NextFunction } from "express"

interface ValidationOption{
    required?: boolean
}

export class Validator {

    private nameLengthValidationMsg = 'must be string btw 2 to 100 characters long'
    private numberValiditionMessage = 'must be numeric'
    private objectIdMessage = 'must be an hexadecimal of length 24'
    
    public validateObjectId = (fieldName: string, { required }: ValidationOption) =>{

        const validationChain = () =>  body(fieldName)
            .trim()
            .matches(/[a-fA-F0-9]{24}/)
            .withMessage(
                `${fieldName} ${this.objectIdMessage}`)
            .escape()

        if(required){
            return validationChain().notEmpty().withMessage(`${fieldName} is required`)
        } else {
            return validationChain().optional()
        }
    }

    public validateObjectIDArray = (fieldName: string, { required }: ValidationOption) =>{
        const validationChain = () => body(fieldName)
            .custom(this.validateIds)
            .withMessage(
                `${fieldName} ${this.objectIdMessage} array`
            )

        if(required){
            return validationChain().notEmpty()
                .withMessage(`${fieldName} is required`)

        } else{
            return validationChain().optional()
        }
    }

    private validateIds = (objectIds:string[]) =>{
        if(!Array.isArray(objectIds))
            return false

        return objectIds.every(id =>{
            return isValidObjectId(id)
        })
    }

    public validateReferenceId = (paramName: string, { required }: ValidationOption) =>{
        const validationChain = () => param(paramName)
            .trim()
            .matches(/^[a-fA-F0-9]{24}$/)
            .withMessage('Invalid reference Id')
            .withMessage(`${paramName} is required`)
            .escape()

        if(required){
            return validationChain().notEmpty().withMessage(`${paramName} is required.`)
        } else{
            return validationChain().optional()
        }
    }

    public validateName = (fieldName: string, { required }: ValidationOption) =>{
        const validationChain = () => body(fieldName)
            .trim()
            .isLength({ min: 2, max: 100})
            .withMessage(
                `${fieldName} ${this.nameLengthValidationMsg}`
            )
            .escape()

        if(required){
            return validationChain().notEmpty().withMessage(
                `${fieldName} is reuired`)
        } else{
            return validationChain().optional()
        }
    }

    public validateNumber = (fieldName: string, { required }: ValidationOption) =>{

        const validationChain = () => body(fieldName)
            .trim()
            .isNumeric()
            .withMessage(
            `${fieldName} ${this.numberValiditionMessage}`)
            .escape()

        if(required){
            return validationChain().notEmpty().withMessage(
                `${fieldName} is required`)

        } else{
            return validationChain().optional()
        }
    }

    public validateReferenceName = (paramName: string, { required }: ValidationOption) =>{
        const validationChain = () => param(paramName)
            .trim()
            .matches(/^[a-z0-9]{2,100}$/i)
            .withMessage(`${paramName} must be a 2-50 characters long`)
            .escape()

        if(required){
            return validationChain().notEmpty().withMessage(`${paramName} is required`)
        } else {
            return validationChain().optional()
        }
    }

    public validateNameField(fieldName: string, { required}: ValidationOption): ValidationChain{

        const formattedName = formatter.formatFieldName(fieldName)
        const validationChain = () => body(fieldName)
            .trim()
            .matches(/^.{2,100}$/)
            .withMessage(`${formattedName} must be a 2-50 characters long`)
            .escape()

        if(required){
            return validationChain().notEmpty().withMessage(`${formattedName} is required.`)
        } else {
            return validationChain().optional()
        }

    }

    public validateBooleanField = (field: string, { required }: ValidationOption) =>{

        const validationChain = () => body(field)
            .trim()
            .isBoolean()
            .withMessage(`${field} field must be boolean`)

        if(required){
            return validationChain().notEmpty().withMessage(`${field} is required.`)  
        } else{
            return validationChain().optional()
        }
    }

    public validateString(fieldName: string, { required }: ValidationOption){
        const validationChain = () => body(fieldName).trim()
            .isString().escape()
        
        if(required){
            return validationChain().notEmpty()
                .withMessage(`${fieldName} is required`)
        } else{
            return validationChain().optional()
        }
    }

    public validateUrl = (fieldName: string, { required}: ValidationOption) =>{
        const validationChain = () => body(fieldName).trim()
        .isString()
    
        if(required){
            return validationChain().notEmpty()
                .withMessage(`${fieldName} is required`)
        } else{
            return validationChain().optional()
        }
    }

    public handleValidationErrors = (
        req: Request, res: Response, next: NextFunction 
        ) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json({
                    message: 'Invalid input or referenceId',
                    errors: errors.array()
                })
            }  else {
                next()
            }
    }
}

export const validator = new Validator()

