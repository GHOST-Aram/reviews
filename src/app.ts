import { ReviewsController } from "./controller/controller";
import { ReviewDataAccess} from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { app, connection } from "./config/config";
import { DB } from "./z-library/db/db";
import { reviewSchema } from "./data-access/model";
import { authenticator } from "./z-library/auth/auth";


const dbConnection = connection.switch('e-commerce-reviews')
const db = new DB(dbConnection)
const ReviewModel = db.createModel('Review', reviewSchema)
const dataAccess  = new ReviewDataAccess(ReviewModel)

const controller = new ReviewsController(dataAccess)

app.use('/reviews', routesWrapper(controller, authenticator))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)
