const Epub = require('epub-gen');

const epubConfig = {
    title: "Test Book",
    author: "Charlie Whiskee",
    output: "./created/Test Book.epub",
    lang: "en",
    verbose: true,
    css: `
        body {
            font-family: "Merriweather", serif;
        }
        #toc li:first-child {
            display: none;
        }
    `,
    content: [{
        title: "An Opening Page",
        data: "<p>Vivamus semper varius metus, eu euismod velit dapibus sed. Aliquam quis feugiat nulla, lobortis semper nisl. Nam venenatis velit eu scelerisque consectetur. Curabitur suscipit, arcu sed lobortis consectetur, mauris odio tempor eros, vitae mattis sem orci non sem. Suspendisse potenti. Proin non ligula leo. Curabitur ultrices augue erat, ac egestas sem vulputate sit amet. Nunc sodales ullamcorper justo, pharetra efficitur velit egestas in. Fusce dictum pharetra erat, id vehicula ex convallis et. Phasellus et nibh sit amet sem consequat molestie eget vitae risus. Sed faucibus magna urna, eget pharetra leo consequat vel. Vestibulum fringilla pellentesque leo, auctor finibus nisi porta et. In hac habitasse platea dictumst. In hac habitasse platea dictumst. Etiam velit velit, porta ac malesuada a, bibendum id enim.</p>"
    }, {
        title: "Another Chapter",
        data: "<p>Vivamus semper varius metus, eu euismod velit dapibus sed. Aliquam quis feugiat nulla, lobortis semper nisl. Nam venenatis velit eu scelerisque consectetur. Curabitur suscipit, arcu sed lobortis consectetur, mauris odio tempor eros, vitae mattis sem orci non sem. Suspendisse potenti. Proin non ligula leo. Curabitur ultrices augue erat, ac egestas sem vulputate sit amet. Nunc sodales ullamcorper justo, pharetra efficitur velit egestas in. Fusce dictum pharetra erat, id vehicula ex convallis et. Phasellus et nibh sit amet sem consequat molestie eget vitae risus. Sed faucibus magna urna, eget pharetra leo consequat vel. Vestibulum fringilla pellentesque leo, auctor finibus nisi porta et. In hac habitasse platea dictumst. In hac habitasse platea dictumst. Etiam velit velit, porta ac malesuada a, bibendum id enim.</p>"
    }]
}

new Epub(epubConfig).promise.then(
    () => console.log("Sucess"),
    err => console.error(err.message)
)


