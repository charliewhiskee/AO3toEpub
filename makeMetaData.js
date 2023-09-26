function makeMetaData () {
    function stringifyTags (tags) {
        const arrTags = []
        tags.forEach(tag => arrTags.push(tag.textContent.trim()))
        return arrTags.join(", ")
    }

    const author = global.document.querySelector('.preface .byline').textContent.trim()
    const title = global.document.querySelector('.preface .title').textContent.trim()

    const categories = global.document.querySelectorAll('dd.category .tag')
    const fandoms = global.document.querySelectorAll('dd.fandom .tag')
    const relationships = global.document.querySelectorAll('dd.relationship .tag')
    const characters = global.document.querySelectorAll('dd.character .tag')
    const freeforms = global.document.querySelectorAll('dd.freeform .tag')

    const content = `
        <div class="meta">
            <b>${title}</b> - ${author}
            <br />
            <b>Rating:</b> ${global.document.querySelector('dd.rating').textContent.trim()}
            <br />
            <b>Warnings:</b> ${stringifyTags(global.document.querySelectorAll('dd.warning .tag'))}
            ${categories[0] ?
                `
                <br />
                <b>Categories:</b> ${stringifyTags(categories)}
                ` : ''
            }
            ${fandoms[0] ? `
                <br />
                <b>Fandom:</b> ${stringifyTags(fandoms)}
            `: ''}
            ${relationships[0] ? `
                <br />
                <b>Relationships:</b> ${stringifyTags(relationships)}
            ` : ''}
            ${characters[0] ? `
                <br />
                <b>Characters:</b> ${stringifyTags(characters)}
            ` : ''}
            ${freeforms[0] ? `
                <br />
                <b>Tags:</b> ${stringifyTags(freeforms)}
            ` : ''}
            <br />
            <b>Words:</b> ${global.document.querySelector('dd.words').textContent.trim()}
        </div>
    `;

    const tags = {
        data: content,
        beforeToc: true
    }

    const titlePage = {
        title: title,
        beforeToc: true,
        data: `
            <p>by ${author}</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>${stringifyTags(fandoms)}</p>
            <p>${stringifyTags(relationships)}</p>`
    }

    const summary = {
        title: "Summary",
        data: global.document.querySelector('div.summary.module > blockquote').innerHTML,
        beforeToc: true
    }

    return [titlePage, summary, tags]
}

export default makeMetaData