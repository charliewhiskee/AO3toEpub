import axios from 'axios';

async function getFic () {
    const workId = process.argv[2];

    if (!workId) {
        console.error("You must pass a work id number like so: `npm start -- 12345`");
        return
    }

    let response;

    try {
        response = await axios.get('https://archiveofourown.org/works/' + workId + '?view_full_work=true&view_adult=true')
    } catch (error) {
        console.error("Couldn't retrieve fic:", error.message)
        return
    }

    return response;
}

export default getFic;
