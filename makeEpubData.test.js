import { readFile } from 'fs/promises';
import makeEpubData from './makeEpubData.js';
import { JSDOM } from 'jsdom';

let fic;
let data;

describe("makeEpubData", () => {
    describe("Given a multi-chapter work with chapter titles", () => {
        beforeAll(async () => {
            fic = await readFile('./fixtures/Cats Out The Bag - Bane_Huntress - NCIS [Archive of Our Own].html')
            data = makeEpubData(new JSDOM(fic).window.document);
        })
    
        it("Gets the correct title", () => {
            expect(data.title).toBe('Cats Out The Bag')
        })
    
        it("Gets the correct author(s)", () => {
            expect(data.author).toBe("Bane_Huntress")
        })

        it("Gets the right number of chapters", () => {
            expect(data.content.length).toBe(15)
        })

        it("Gets the right chapter titles", () => {
            expect(data.content[0].title).toBe('What the Hell?')
        })
    })
})

