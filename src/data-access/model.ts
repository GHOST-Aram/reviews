import { HydratedDocument, Model, ObjectId, Schema, model } from "mongoose";

export interface Review{
    author: ObjectId
    product: ObjectId
    content: string
    createdAt: Date
}

export type ReviewModel = Model<Review>

export const reviewSchema = new Schema<Review,ReviewModel>({
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

export type HydratedReviewDoc = HydratedDocument<Review>
export const Review = model<Review, ReviewModel>(
    'Review', reviewSchema)