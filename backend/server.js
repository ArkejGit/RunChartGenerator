var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var app     = express();

app.get('/runs', function(req, res){

const url = 'https://plus-timing.pl/txt_wyniki.php';

    request(url, function(error, response, html){
        if(!error){
            const $ = cheerio.load(html);

            let title, links;
            const output = [];

            const getData = $('.wyniki_box').each((i, div) => {
                const title = $(div).children('.wyniki_tytul').eq(0).text();
                titleDecoded = iconv.decode(Buffer.from(title,'latin1'), 'iso-8859-1');

                const links = [];
                $(div).children('.wyniki_pdf').each((i,el) => {
                    links.push($(el).find('a').eq(0).attr('href'));
                });                

                const run = {'title': titleDecoded, 'links': links};

                output.push(run);

                if (i >= Number(req.query.number) + 9) return false;
            });

            res.send(JSON.stringify(output));
         } 
    });    
})

app.get('/results', function(req, res){
    const link =  req.query.link;
     res.send(JSON.stringify(link));
})

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})