import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import request from "supertest"


describe('DELETE reviews (By Review ID)', () =>{

    test('Rejects delete-all requests, (status 405): Method not allowed.', 
        async() =>{
            const response = await request(app).delete('/reviews')
            
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors, (status 400): Bad request '+
        'Invalid reference Id.', 
        async() =>{
            const response = await request(app).delete(
                '/reviews/64c9e4f2')
            
            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )
    
    test('Responds with Not Found, (status 404): Target not found.', 
        async() =>{
            const response = await request(app).delete(
                '/reviews/64c9e4f2df7cc072af2ac8e4')

            assert.respondsWithNotFound(response)
        }
    )

    test('Responds with deleted resource Id, (status 200): Delete operation success.',
        async() =>{
            const response = await request(app).delete(
                '/reviews/64c9e4f2df7cc072af2ac9e4')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithDeletedResource(response)
        }
    )
})