import { NextFunction, Request, Response } from "express"
import { ReviewDataAccess } from "../data-access/data-access"
import { HydratedReviewDoc } from "../data-access/model"
import { GenericController } from "../z-library/bases/generic-controller"

export class ReviewsController extends GenericController<ReviewDataAccess>{

    constructor(dataAccess: ReviewDataAccess){
        super(dataAccess)
    }


    public getOne = async(req: Request, res: Response, next: NextFunction) => {
        //Getting a specific review with specific review id is not allowed
        // Reviews can only be accessed a a collection of random reviews of a collection
        // of reviews on a specific product.
        this.respondWithMethodNotAllowed(req, res)
    }


    //Get reviews for a specific products
    public getProductReviews = async(req: Request, res: Response, next: NextFunction) =>{

        const productId = req.params.productId

        const paginator = this.paginate(req)
        try {
            const reviews = await this.dataAccess
                .findByProductId(productId, paginator)

            this.respondWithFoundResource(reviews, res)
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        //A Once a review is posted, it cannot be updated fully but it can be
        //modifed partially
        this.respondWithMethodNotAllowed(req, res)
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{

        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated()){

            const reviewId = req.params.reviewId
            const content: string = req.body.content
    
            try {
                const toBeModified = await this.dataAccess.findByReferenceId(reviewId)
               
                if(toBeModified === null)
                    this.respondWithNotFound(res)
                else {
                    this.handleForbiddenRequest(toBeModified, currentUser, res)
                }
                //Allow users to modify only the reviews that they authored   
                await this.handleUpdate(reviewId, { content }, res) 
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnauthorised(res)
        }
    }

    private handleForbiddenRequest = (
        toBeModified: HydratedReviewDoc, currentUser:any, res: Response) =>{
        const authorIsCurrentUser = toBeModified.author.toString() === 
            currentUser._id.toString()
                
        if(!authorIsCurrentUser)
            this.respondWithForbidden(res)
        else
            return
    }

    private handleUpdate = async(updateId: string, updateDoc:any, res: Response) =>{
        const updatedReview = await this.dataAccess.findByIdAndUpdate(
            updateId, updateDoc)

        if(updatedReview !== null)
            this.respondWithModifiedResource(updatedReview.id, res)    
        else
            this.respondWithNotFound(res)
    }

    public deleteOne = async (req: Request, res: Response, next: NextFunction) =>{

        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated() && currentUser.isAdmin){

            const reviewId = req.params.reviewId
            
            try {
                const deletedReview = await this.dataAccess.findByIdAndDelete(
                    reviewId)
    
                if(deletedReview !== null)
                    this.respondWithDeletedResource( deletedReview.id, res)
                else
                    this.respondWithNotFound(res)
            } catch (error) {
                next(error)
            }    
        } else{
            this.respondWithForbidden(res)
        }
    }
}