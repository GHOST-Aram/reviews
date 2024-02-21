import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import request from "supertest"


describe('GET Reviews routes (Get reviews by product ID or random reviews)', () =>{
    test('Responds with validation errors, (status 400): '+
        'Invalid reference (product Id)', 
        async() =>{
            const response = await request(app).get('/reviews/34522jdjd')

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Random reviews: responds with paginated resource, (status 200): '+
        'Default pagination limit => 10 ', 
        async() =>{
            const response = await request(app).get('/reviews')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 10)
        }
    )

    test('Specific product review: Responds with paginated resource, status 200: '+
        'Default pagination => 10.', 
        async() =>{
            const response = await request(app).get('/reviews')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 10)
        }
    )

    test('Specific product review: Responds with paginated resource, status 200: '+
        'Requested pagination.', 
        async() =>{
            const response = await request(app).get(
                '/reviews/64c9e4f2df7cc072af2ac9e4?page=1&limit=23')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 23)
        }
    )

    test('Random reviews: Responds with paginated resource, status 200: '+
    'Requested pagination.', 
    async() =>{
        const response = await request(app).get('/reviews?page=1&limit=23')
        
        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response, 23)
    }
)

})