import { body, param, validationResult, ValidationChain } from "express-validator"
import { Response, Request, NextFunction } from "express"
import { formatter } from '../formatting/formatter'
import { isValidObjectId } from "mongoose"

export class Validator {


    private nameLengthValidationMsg = 'must be string btw 2 to 100 characters long'
    private numberValiditionMessage = 'must be numeric'
    private objectIdMessage = 'must be an hexadecimal of length 24'

    
    public validateObjectId = (fieldName: string) =>{
        return body(fieldName).notEmpty()
            .withMessage(`${fieldName} is required`)
            .matches(/[a-fA-F0-9]{24}/)
            .withMessage(
                `${fieldName} ${this.objectIdMessage}`)
    }

    public validateObjectIDArray = (fieldName: string) =>{
        return body(fieldName).notEmpty()
            .withMessage(`${fieldName} is required`)
            .custom(this.validateIds)
            .withMessage(
                `${fieldName} ${this.objectIdMessage} array`)
    }

    private validateIds = (objectIds:string[]) =>{
        if(!Array.isArray(objectIds))
            return false

        return objectIds.every(id =>{
            return isValidObjectId(id)
        })
    }

    public validateReferenceId = (paramName: string) =>{
        return param(paramName).matches(/^[a-fA-F0-9]{24}$/)
            .withMessage('Invalid reference Id')
    }

    public validateName = (fieldName: string) =>{
        return body(fieldName).trim()
            .isLength({ min: 2, max: 100})
            .withMessage(
                `${fieldName} ${this.nameLengthValidationMsg}`)
            .escape()
    }

    public validateNumber = (fieldName: string) =>{
        return body(fieldName).isNumeric()
            .withMessage(
                `${fieldName} ${this.numberValiditionMessage}`)
    }

    public validateRequiredField = (fieldName: string): ValidationChain =>{
        return body(fieldName).trim()
            .escape().notEmpty()
            .withMessage(`${fieldName} field is required`)
    }

    public validateOptionalField = (fieldName: string): ValidationChain =>{
        return body(fieldName).trim()
            .escape().optional()
    }

    public validateReferenceName = (paramName: string) =>{
        return param(paramName)
            .matches(/^[a-z0-9]{2,100}$/i)
            .withMessage(`${paramName} must be a 2-50 characters long`)
            .trim()
            .escape()
    }
   
    public validateNameField(fieldName: string): ValidationChain{
        const formattedName = formatter.formatFieldName(fieldName)

        return body(fieldName)
            .matches(/^.{2,100}$/)
            .withMessage(`${formattedName} must be a 2-50 characters long`)
            .trim()
            .escape()
    }

    public validateNumberField(fieldName: string):ValidationChain{
        const formattedName = formatter.formatFieldName(fieldName)

        return body(fieldName)
            .trim()
            .escape()
            .custom((value) =>{
                return Number(value) > 1
            })
            .withMessage(`${formattedName} must be greater than 1`)
    }

    public validateOptionalBooleanField = (field: string) =>{
        return body(field).isBoolean()
            .withMessage(`${field} field must be boolean`)
            .optional()
    }

    public handleValidationErrors = (req: Request, res: Response, 
        next: NextFunction) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json({ 
                    message: 'Invalid input',
                    errors: errors.array()
                })
            } else {
                next()
            }
    }

}