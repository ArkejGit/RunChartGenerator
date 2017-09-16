var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/runs', function(req, res){

url = 'https://plus-timing.pl/txt_wyniki.php';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var title, links;
            var output = [];

            var getData = $('.wyniki_box').each((i, div) => {
                var title = $(div).children('.wyniki_tytul').eq(0).text();

                var links = [];
                $(div).children('.wyniki_pdf').each((i,el) => {
                    links.push($(el).find('a').eq(0).attr('href'));
                });

                

                var run = {'title': title, 'links': links};

                output.push(run);

                if (i >= Number(req.query.number) + 9) return false;
            });

         }

res.send(JSON.stringify(output));

    });
})

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})