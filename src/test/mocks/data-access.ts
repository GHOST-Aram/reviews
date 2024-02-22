import { jest } from '@jest/globals'
import { 
        HydratedReviewDoc, 
        Review, 
        ReviewModel 
} from '../../data-access/model'
import { Paginator } from '../../z-library/HTTP/http-response'
import { reviewData } from './raw-data'
import { GenericDataAccess } from '../../z-library/bases/generic-data-access'
import { ReviewDataAccess } from '../../data-access/data-access'

export class DataAccess extends ReviewDataAccess{


    constructor(model: ReviewModel){
        super(model)
    }

    public createNew = jest.fn(

        async(input: Review): Promise<HydratedReviewDoc> =>{

            const mockReview =  new this.model(input)
            return mockReview
        }
    )

    public findByReferenceId = jest.fn(

        async(id: string): Promise<HydratedReviewDoc | null> =>{
            /**
             * this mock funtion returns two kinds of documents or null
             * Document 1 - A review document that is  was authored by current  user
             * Document 2- A random review documents that was not authored by 
             * current user. This is because we are searching for a review document
             * by review ID. 
             * 
             * One user may have written several reiviews and a product
             * can have many reivews too. So the only remaining unique identifier 
             * in the review document is the reiview ID.
             * 
             * This mock function cares about the current user ID because we need to
             * test that our controller methods allows users to modify only the
             * reviews that they created. Because many reviews can be presented under a product
             * including the ones that were not written by current user, we need to ensure
             * that the current user cannot modify the revews they did not create.
             */
            const expectedCurrentUserId =  '64c9e4f2df7cc072af2ac9e4'
            const notCurrentUserId = '99c9e4f2df7cc072af2ac9e4'

            if( id === notCurrentUserId){ 
                /**
                 * This value will be used to test that current user is not 
                 * permitted to edit random reviews that they did not create.
                 */
                const notAuthoredByCurrentUser = new this.model({
                    author: '77c6e4f2df7cc072af2ac9e8',//Not current user
                    product: '64c9e4f2df7cc072af2ac9e8',
                    content: 'Lorem ipsos'
                })
                
                return notAuthoredByCurrentUser

            } else if(id === expectedCurrentUserId){ 
                /**
                 * This value is used to test that the current user is allowed to
                 * modify the reviews that they created.
                 */
                const authoredByCUrrentUser =  new this.model({
                    author: '64c9e4f2df7cc072af2ac9e8',//Current user Id
                    product: '64c9e4f2df7cc072af2ac9e8',
                    content: 'Lorem ipsol'
                })

                return authoredByCUrrentUser
                
            } else {
                /**
                 * This return value is used to test that the client will receive a 404
                 * response if they are requesting does not exist in the db.
                 */
                    return null 
            }
        }
    )
    
    public findByProductId = jest.fn(

        async( productId: string, paginator: Paginator): Promise<HydratedReviewDoc[]> =>{

            const idOfProductWithReviews = '64c9e4f2df7cc072af2ac9e4'
            let mockReviews: HydratedReviewDoc[] = []

            if(productId === idOfProductWithReviews)
                mockReviews = this.createMockReviewsArray(paginator.limit)

            return mockReviews
        }
    )

    private createMockReviewsArray = (length: number ): HydratedReviewDoc[] =>{

        let count = 0
        const mockReviews: HydratedReviewDoc[] = []
        
        while (count < length){
            mockReviews.push(new this.model(reviewData))
            count++
        }

        return mockReviews
    }

    public findWithPagination = jest.fn(

        async(paginator: Paginator): Promise<HydratedReviewDoc[]> =>{

            const mockFoundReviews =  this.createMockReviewsArray(paginator.limit)
            return mockFoundReviews
        }
    )

    public findByIdAndUpdate = jest.fn(

        async(id: string): Promise<HydratedReviewDoc | null> =>{

            const expectedCurrentUserId = '64c9e4f2df7cc072af2ac9e4'

            if(id === expectedCurrentUserId){

                const authoredByCUrrentUser =  new this.model({
                    author: '64c9e4f2df7cc072af2ac9e8',//Current user Id
                    product: '64c9e4f2df7cc072af2ac9e8',
                    content: 'Lorem ipsis'
                })

                return authoredByCUrrentUser

            } else return null   //Not Found
            
    })

    public findByIdAndDelete = jest.fn(

        async(id: string): Promise<HydratedReviewDoc | null> =>{

            const idOfAvailableReview = '64c9e4f2df7cc072af2ac9e4'

            if(id === idOfAvailableReview){

                const mockdeletedReview =  new this.model(reviewData)
                return mockdeletedReview

            } else return null
        }
    )
}