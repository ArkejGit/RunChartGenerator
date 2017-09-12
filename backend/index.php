<?php 

include('simple_html_dom.php');
	
	$html = file_get_html('https://plus-timing.pl/txt_wyniki.php');
	$div = $html->find('div[class=wyniki_box]');

	$output = [];
	$i = 1;

	foreach ($div as $container) {
        if ($i > 10) {
                break;
        }
 		
        $title = $container->find('div[class=wyniki_tytul]', 0)->plaintext;

        $links = [];
        foreach ($container->find('div[class=wyniki_pdf]') as $div) {
        	$link = $div->find('a', 0)->href;
        	$links[] = ['link' => $link];
        }

        $output[] = [
        	'title' => $title,
        	'links' => $links
        ];
 
        $i++;
	}

	echo json_encode($output);
?>