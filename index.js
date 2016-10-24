const express = require('express')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')

const app = express()
const PORT = process.env.PORT || 3001

app.get('/scrape', function(req, res) {
  console.log('here we are!')
  let url = 'http://www.imdb.com/title/tt1229340/'
  request(url, function(err, res, html) {
    if (!err) {
      let $ = cheerio.load(html)
      let title, release, rating
      let json = { title : '', release : '', rating : '' }

      $('.header').filter(function() {
        let data = $(this)
        title = data.children().first().text()
        release = data.children().last().children().text()
        json.title = title
        json.release = release
      })
      $('.star-box-giga-star').filter(function() {
        let data = $(this)
        rating = data.text()
        json.rating = rating
        console.log(JSON.stringify(json))
      })
    }
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})


exports = module.exports = app
