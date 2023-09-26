import { readFile } from 'fs/promises';
import makeMetaData from './makeMetaData.js';
import { JSDOM } from 'jsdom';

let fic;
let dom;

describe("makeMetaData", () => {
    describe("Given a multi-chapter work with chapter titles", () => {
        beforeAll(async () => {
            fic = await readFile('./fixtures/Cats Out The Bag - Bane_Huntress - NCIS [Archive of Our Own].html')
            dom = new JSDOM(fic).window.document;
        })
    
        test("Makes the right metadata", () => {
            makeMetaData(dom)
        })
    })
})