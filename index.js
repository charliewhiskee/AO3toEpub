import Epub from 'epub-gen';
import getFic from './getFic.js';
import cleanFic from './cleanFic.js';
import makeEpubData from './makeEpubData.js';
import { readFile } from 'fs/promises';
import { JSDOM } from 'jsdom';

async function makeEpub () {
    const response = await getFic();
    // const fic = await readFile('./fixtures/Cats Out The Bag - Bane_Huntress - NCIS [Archive of Our Own].html');
    
    if(!response) {
        console.error('No response');
        return
    }

    const dom = new JSDOM(response.data);

    global.window = dom.window;
    global.document = dom.window.document;

    cleanFic();
    const epubData = makeEpubData()
    
    await new Epub(epubData).promise
}

makeEpub()

