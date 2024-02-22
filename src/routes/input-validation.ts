import { validator } from "../utils/validator";

export const newReviewInputValidators = [
    validator.validateObjectId('author', { required: true}),
    validator.validateString('content', { required: true }),
    validator.validateObjectId('product', { required: true })
]

export const patchInputValidators = [
    validator.validateString('content', { required: true }), 
]