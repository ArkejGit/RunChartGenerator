<?php 

include('simple_html_dom.php');
	
	$html = file_get_html('https://plus-timing.pl/txt_wyniki.php');
	$div = $html->find('div[id=row-tresc]');

	echo $div[0]
?>