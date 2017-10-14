let express = require('express');
let request = require('request');
let cheerio = require('cheerio');
let iconv = require('iconv-lite');
let fs = require('fs');
let PDFParser = require("pdf2json");
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
    const runName = req.query.link.match(/[^/]*$/)[0].slice(0, -4);

    let pdfStream = fs.createWriteStream('PDF/' + runName + '.pdf');
    let jsonStream = fs.createWriteStream('PDF/' + runName + '.json');
    
    request(link, parsePDF).pipe(pdfStream);

    function parsePDF() {
        let pdfParser = new PDFParser();
        let results;
        jsonStream;

        pdfParser.loadPDF('PDF/' + runName + '.pdf');

        pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );

        pdfParser.on("pdfParser_dataReady", pdfData => {
            jsonStream.write(JSON.stringify(pdfData));

            let resultTitleContainer = pdfData.formImage.Pages[0].Texts.filter(text => text.R[0].T == 'Wynik')[0];
            let x = resultTitleContainer.x;

            let resultsArray = pdfData.formImage.Pages.map(page => {
                return page.Texts.filter(text => {
                    return (Math.abs(text.x - x) < 1) && (text.R[0].T != 'Wynik');
                });
            });
            let formattedResultsArray = [].concat(...resultsArray).map(result => {
                return result.R[0].T.replace(/%3A/g,':')
            });

            results = JSON.stringify(formattedResultsArray);
            res.send(results);
            fs.unlink('PDF/' + runName + '.pdf', (err) => {
                if (err) {console.error(err)}
                else console.info(runName + '.pdf deleted')
            });
        });  
              
    }
       
})

app.listen(80, function () {
  console.log('Example app listening on port 80!')
});