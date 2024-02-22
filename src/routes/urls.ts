import Router from 'express'
import { ReviewsController } from '../controller/controller'
import * as middlewear from './input-validation'
import { validator } from '../utils/validator'
import { Authenticatable, Authenticator } from '../z-library/auth/auth'

const router = Router()

export const routesWrapper = (
    controller: ReviewsController, authenticator: Authenticator | Authenticatable
    ) =>{

    router.post('/:id', 
        authenticator.authenticate(),
        controller.respondWithMethodNotAllowed)

    router.post('/', 
        authenticator.authenticate(),
        middlewear.newReviewInputValidators ,
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/', 
        authenticator.authenticate(),
        authenticator.allowAdminUser,
        controller.getMany
    )
    
    
    router.get('/:productId', 
        validator.validateReferenceId('productId', { required: true}),
        validator.handleValidationErrors,
        controller.getProductReviews
    )

    router.put('/', authenticator.authenticate(),
        controller.respondWithMethodNotAllowed)

    router.put('/:reviewId', 
        authenticator.authenticate(),
        controller.updateOne
    )

    router.patch('/', 
        authenticator.authenticate(),
        controller.respondWithMethodNotAllowed)

    router.patch('/:reviewId', 
        authenticator.authenticate(),
        validator.validateReferenceId('reviewId', { required: true }),
        middlewear.patchInputValidators,
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', authenticator.authenticate(),
        controller.respondWithMethodNotAllowed )

    router.delete('/:reviewId', 
        authenticator.authenticate(),
        authenticator.allowAdminUser,
        validator.validateReferenceId('reviewId', { required: true }),
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router
}