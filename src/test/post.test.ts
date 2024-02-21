import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('POST Reviews route', () =>{
	test('Rejects requests with client defined id, (status 405): Method not Allowed.', 
		async() =>{
			const response = await request(app).post(
				'/reviews/64c9e4f2df7cc072af2ac9e4')
				.send(data.reviewData)

			assert.respondsWithMethodNotAllowed(response)
		}
	)

	test('Responds with validation errors, (status 400): Invalid input.', 
		async() =>{
			const response = await request(app).post('/reviews')
				.send(data.badData)
			
			assert.respondsWithBadRequest(response)
			assert.respondsWithValidationErrors(response)
		}
	)

	test('Responds with created resource URI, (status 204): Post request success.', 
		async() =>{
			const response = await request(app).post('/reviews')
				.send(data.reviewData)

			assert.respondsWithCreatedResource(response)
		}
	)
})