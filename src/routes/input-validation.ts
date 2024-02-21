import { validator } from "../utils/validator";

export const newReviewInputValidators = [
    validator.validateRequiredField('author').isLength({ min: 24, max: 24}), 
    validator.validateRequiredField('content').isLength({ min: 2, max: 500}),
    validator.validateRequiredField('product').isLength({ min: 24, max: 24 })
]

export const patchInputValidators = [
    validator.validateRequiredField('content'),
]