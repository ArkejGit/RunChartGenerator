let express = require('express');
let request = require('request');
let cheerio = require('cheerio');
let iconv = require('iconv-lite');
let fs = require('fs');
let app = express();

// ----- GET RUNS -----
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

// ----- GET RESULTS -----
app.get('/results', function(req, res){
    const link =  'https://plus-timing.pl/' + req.query.link;

    request.head(link, function(error, response, body){
        request(link).pipe(fs.createWriteStream('PDF/run.pdf')).on('close', () => {
            res.send(JSON.stringify('done'));
        })
    });
    
    
})

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})