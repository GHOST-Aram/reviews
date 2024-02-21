import { test, expect, describe } from "@jest/globals";
import { formatter } from "./formatter";

describe('Formatter Class', () =>{
    test('Capitalizes first character', () =>{
        const formattedName = formatter.formatFieldName('elis')
        expect(formattedName).toStrictEqual('Elis')
    })

    test('Replaces underscore with whitespace', () =>{
        const formattedName = formatter.formatFieldName(
            'hello_world')
        expect(formattedName).toStrictEqual('Hello world')
    })

    test('Returns valid range numbers from a valid range string', () =>{
        const range = formatter.extractPriceRange('300-800')

        expect(range.start).toEqual(300)
        expect(range.end).toEqual(800)
    })

    test('Returns null for invalid range strings', () =>{
        const range = formatter.extractPriceRange('400800')

        expect(range.start).toBe(null)
        expect(range.end).toBe(null)
    })

    test('Returns correct price range for reversed ranges', 
    () =>{
        const range = formatter.extractPriceRange('8900-200')

        if(range.start && range.end){
            expect(range.start).toBeLessThan(range.end)
            expect(range.end).toBeGreaterThan(range.start)
            expect(range.start).toEqual(200)
            expect(range.end).toEqual(8900)
        }
    })

    test('Returns null for a zero gap range eg 100-100',() =>{
        const range = formatter.extractPriceRange('100-100')

        expect(range.start).toBe(null)
        expect(range.end).toBe(null)
    } )
})