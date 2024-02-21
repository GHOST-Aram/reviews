import { Paginator } from "../z-library/HTTP/http-response"
import { Accessible } from "../z-library/bases/accessible"
import { HydratedReviewDoc, IReview, Review, ReviewModel } from "./model"

export class ReviewDataAccess implements Accessible{
    public Model: ReviewModel

    constructor(model: ReviewModel){
        this.Model = model
    }
    public createNew = async(reviewData: IReview): Promise<HydratedReviewDoc> =>{
        const doc = new this.Model(reviewData)
        return await doc.save()
    }

    public findByReferenceId = async(refId: string): Promise<any | null> => {
        return await this.Model.findById(refId)
    }

    public findByProductId = async(productId: string, paginator: Paginator
        ) : Promise<HydratedReviewDoc[]> =>{

        return await this.Model.find({product: productId})
            .skip(paginator.skipDocs)
            .limit(paginator.limit)
           
    }

    public findWithPagination = async(paginator: Paginator): Promise<HydratedReviewDoc[]> =>{
        return await this.Model.find().skip(paginator.skipDocs)
            .limit(paginator.limit)
    }

    public findByIdAndUpdate = async(id: string, updateDoc: {content: string }
        ): Promise<HydratedReviewDoc | null> =>{
            return await this.Model.findByIdAndUpdate(
                id, updateDoc, { new: true })
    }

    public findByIdAndDelete = async(id: string): Promise<HydratedReviewDoc | null> =>{
        return await this.Model.findByIdAndDelete(id)
    }
}
