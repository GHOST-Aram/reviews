import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('PUT reviews (By Review ID)', () =>{

    test('Rejects update-all requests,  (status 405): Method not allowed.', 
        async() =>{
            const response = await request(app).put('/reviews')
                .send(data.reviewData)
            
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Rejects update with id requests,  (status 405): Method not allowed.', 
        async() =>{
            const response = await request(app).put(
                '/reviews/64c9e4f2df7cc072af2ac9e8')
                .send(data.reviewData)
            
            assert.respondsWithMethodNotAllowed(response)
        }
    )
})