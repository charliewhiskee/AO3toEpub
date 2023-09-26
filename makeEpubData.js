import makeMetaData from './makeMetaData.js'

function makeEpubData () {
    const data = {
        verbose: true,
        lang: "en",
        css: `
            p {
                margin: 0 !important;
                text-indent: 1.3em;
            }
            #toc li:nth-child(-n + 4) {
                display: none;
            }
            .landmark {
                display: none;
            }
            hr {
                width: 65%;
                margin: 1.5em auto 1.5em auto;
                border-color: rgba(0,0,0,0.2);
            }
            .section-break {
                text-indent: 0 !important;
                text-align: center;
                margin: 0.75em auto 0.75em auto !important;
            }
        `,
        content: []
    }

    data.title = global.document.querySelector('.preface .title').textContent.trim()
    data.author = global.document.querySelector('.preface .byline').textContent.trim()

    data.output = `./created/${data.title} - ${data.author}.epub`;
    
    /** If it has one chapter */
    if (!global.document.querySelector('#chapters > .chapter')) {
        data.content.push({
            data: global.document.querySelector('#chapters > .userstuff').innerHTML,
            title: 'Chapter 1'
        })
    /** Multiple chapters */
    } else {
        global.document.querySelectorAll('#chapters > .chapter').forEach((chap, i) => {
            let title = chap.querySelector('.title').textContent

            if (title.includes(':')) {
                title = title.split(':')[1].trim();
            } else {
                title = `Chapter ${i+1}`
            }

            data.content.push({
                data: chap.querySelector('.userstuff[role="article"]').innerHTML,
                title: title
            })
        })
    }

    /** Meta data */
    const metaData = makeMetaData()
    data.content = [...metaData, ...data.content]

    return data
};

export default makeEpubData;