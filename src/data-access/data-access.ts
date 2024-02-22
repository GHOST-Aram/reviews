import { Paginator } from "../z-library/HTTP/http-response"
import { GenericDataAccess } from "../z-library/bases/generic-data-access"
import { HydratedReviewDoc, Review, ReviewModel } from "./model"

export class ReviewDataAccess extends GenericDataAccess<ReviewModel, Review>{

    public findByProductId = async(productId: string, paginator: Paginator
        ) : Promise<HydratedReviewDoc[]> =>{

            //Returns many reviews on a product with a specific id

        return await this.model.find({product: productId})
            .skip(paginator.skipDocs)
            .limit(paginator.limit)
           
    }
}
