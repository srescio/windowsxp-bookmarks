const fs = require('fs')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Get Chrome export page as data source
const bookmarksHtml = fs.readFileSync(`${__dirname}/bookmarks.html`, {encoding:'utf8', flag:'r'});

const dom = new JSDOM(bookmarksHtml);
const document = dom.window.document;

// Choose a subset of bookmarks, using a child link as guide to get a specific directory then fetch its subdirectories and links
const rootDir = document.querySelector('[href="http://css-tricks.com/"]').parentElement.parentElement;
const subDirsHeadings = rootDir.querySelectorAll('h3');
const links = [...subDirsHeadings].map(el => {
    const anchors = el.parentElement.querySelectorAll('a')

    return {
        directory : el.textContent,
        links: [...anchors].map(a => ({
            title: a.textContent,
            url: a.href
        }))
    }
})
 
const jsonContent = JSON.stringify(links, undefined, 4);
 
fs.writeFile(`${__dirname}/data.json`, jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});
