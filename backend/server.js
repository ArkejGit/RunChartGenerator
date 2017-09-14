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

        if (i>=10) return false;
    });
    // .filter(function(){
    //     var data = $(this);
    //     title = data.children().first().text();            
    //     release = data.children().last().children().text();

    //     json.title = title;
    //     json.release = release;
    // })

//     $('.star-box-giga-star').filter(function(){
//         var data = $(this);
//         rating = data.text();

//         json.rating = rating;
//     })
 }


// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send(JSON.stringify(output));

    });
})

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})