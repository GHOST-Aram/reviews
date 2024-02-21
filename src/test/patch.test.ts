import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('PATCH reviews (By Review ID)', () =>{

    test('Rejects patch-all requests, (status 405): Method not allowed.', 
        async() =>{
            const response = await request(app).patch('/reviews')
                .send(data.patchData)
            
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors, (status 400): Invalid reference Id.', 
        async() =>{
            const response = await request(app).patch(
                '/reviews/64c9e4f2df7')
                .send(data.patchData)
            
            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )
    
    test('Responds with Not Found (status 404): Target does not exist.', 
        async() =>{
            const response = await request(app).patch(
                '/reviews/64c9e4f2df7cc072af2ac8e4')
                .send(data.patchData)

            assert.respondsWithNotFound(response)
        }
    )
    
    test('Responds with validation errors (status 400): Invalid input.', 
        async() =>{
            const response = await request(app).patch(
                '/reviews/64c9e4f2df7cc072af2ac9e4')
                .send(data.badData)
            
            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with Forbidden (status 403): User requesting to PATCH is not '+
        'the original author of the review: Permission denied.',
        async() =>{
            const response = await request(app).patch(
                '/reviews/99c9e4f2df7cc072af2ac9e4')
                .send(data.patchData)

            assert.respondsWithForbidden(response)
        }
    )

    test('Responds with modified resource URI, (status 200): Patch Operation success.',
        async() =>{
            const response = await request(app).patch(
                '/reviews/64c9e4f2df7cc072af2ac9e4')
                .send(data.patchData)
            
            assert.respondsWithSuccess(response)
            assert.respondsWithModifedResource(response)
        }
    )
})