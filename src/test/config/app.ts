import express from 'express'
import { ReviewsController } from "../../controller/controller";
import { Review } from "../../data-access/model";
import { DataAccess } from "../mocks/data-access";
import { routesWrapper } from "../../routes/urls";
import { authenticator } from "../mocks/auth";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const dataAccess = new DataAccess(Review)
const controller = new ReviewsController(dataAccess)

app.use('/reviews', routesWrapper(controller, authenticator))

export { app }