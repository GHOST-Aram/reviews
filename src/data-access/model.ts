import { HydratedDocument, Model, ObjectId, Schema, model } from "mongoose";

export interface IReview{
    author: ObjectId
    product: ObjectId
    content: string
    createdAt: Date
}

export type ReviewModel = Model<IReview>

export const reviewSchema = new Schema<IReview,ReviewModel>({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export type HydratedReviewDoc = HydratedDocument<IReview>
export const Review = model<IReview, ReviewModel>(
    'Review', reviewSchema)