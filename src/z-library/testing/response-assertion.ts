import { Response } from "supertest";
import { expect } from "@jest/globals";

export class ResponseAssertion{

    public respondsWithMethodNotAllowed = (response: Response) =>{
        expect(response.status).toEqual(405)
        expect(response.body).toMatch(/not allowed/i)
        expect(response.headers['content-type']).toMatch(/json/i)
    }

    public respondsWithConflict = (response: Response) =>{
        expect(response.status).toEqual(409)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toMatch(/exists/)
    }
    
    public respondsWithBadRequest = (response: Response) =>{
        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
    }
    
    public respondsWithValidationErrors = (response: Response) =>{
        expect(response.body).toHaveProperty('errors')
        expect(Array.isArray(response.body.errors)).toBeTruthy()
    }
    
    public respondsWithCreatedResource = (response: Response) =>{
        expect(response.status).toEqual(201)
        expect(response.body).toMatch(/created/i)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.header.location).toMatch(
            /\/[.\w]+\/[a-fA-F0-9]{24}/)
    }

    public respondsWithAllDataProperties = (properties: any[], response: Response) =>{
        properties.forEach(property =>{
            expect(response.body.resource).toHaveProperty(property)
        })
    }

    public respondsWithNotFound = (response: Response) =>{
        expect(response.status).toEqual(404)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toMatch(/not found/i)
    }

    public respondsWithFoundResource = (response: Response) =>{
        expect(typeof response.body).toMatch(/object/i)
        expect(response.body).toHaveProperty('_id')
    }

    public respondsWithEmptyResourceArray = (response: Response) =>{
        expect(Array.isArray(response.body.resource)).toBeTruthy()
        expect(response.body.resource.length).toEqual(0)
    }

    public respondsWithPaginatedResource = ( response: Response, limit: number) =>{
            const resource = response.body

            expect(resource[0]).toHaveProperty('_id')

            expect(Array.isArray(resource)).toBeTruthy()
            expect(resource.length).toEqual(limit)
    }

    public respondsWithModifedResource = (response: Response) =>{
        expect(response.body).toMatch(/modified/i)
        expect(response.header.location).toMatch(
            /^\/[.\w]+\/[a-fA-F0-9]{24}$/)
    }
    
    public respondsWithUpdatedResource = (response: Response) => {
        expect(response.body).toMatch(/updated/i)
        expect(response.header.location).toMatch(
            /^\/[.\w]+\/[a-fA-F0-9]{24}$/)
    }

    public respondsWithSuccess = (response: Response) =>{
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
    }

    public respondsWithDeletedResource = (response: Response) =>{
        expect(response.body.id).toMatch(/^[a-fA-F0-9]{24}$/)
        expect(response.body.message).toMatch(/deleted/i)
    }

    public respondsWithToken = (response: Response) => {
        expect(response.body).toHaveProperty('token')
        expect(typeof response.body.token).toMatch(/string/i)
        expect(response.body.token).toMatch(/^eyJ[^\s]+\.[^\s]+\.[^\s]+$/)
    }
    
    public respondsWithUnathorised = (response: Response) => {
        expect(response.status).toEqual(401)
        expect(response.headers['content-type']).toMatch(/JSON/i)
        expect(response.body.message).toMatch(/Unauthorised/i)
    }
    
    public respondsWithForbidden = (response: Response) =>{
        expect(response.status).toEqual(403)
        expect(response.body.message).toMatch(/forbidden/i)
        expect(response.headers['content-type']).toMatch(/json/i)
    }
}

export const assert = new ResponseAssertion