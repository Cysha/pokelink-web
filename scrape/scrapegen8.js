const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('https')

const url = 'https://projectpokemon.org/docs/spriteindex_148/3d-models-generation-8-pok%C3%A9mon-r123/'

const selector = '#elDevDocs_columns > div.ipsColumn.ipsColumn_fluid > div > article > div.ipsClearfix > section > table:nth-child(4) img'

let download = function(url, dest) {
  return new Promise((resolve, reject) => {
    try {
      var file = fs.createWriteStream(dest);
      http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close(resolve)
        });
      });
    } catch (err) {
      reject(err)
    }
  })
}

axios(url)
  .then(async (response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    const spriteElements = await $(selector)

    spriteElements.each((index, element) => {
      const fullUrl = $(element).attr('src')
      const path = fullUrl.replace('https://projectpokemon.org/images/', '')
      const shiny = path.substring(0, 5) === 'shiny'
      const fileName = path.split('/').pop()
      const [species, ...forms] = fileName.replace('.gif', '').split('-')
      download(fullUrl, './sprites/' + path)
    })
  })