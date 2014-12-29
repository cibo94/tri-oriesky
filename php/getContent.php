<?php
    $page=$_GET["page"];
    $files = scandir("../content");
//    print_r($files1);
    foreach ($files as $file) {
        if ($file == "$page.html") {
            readfile("../content/".$file);
        }
    }
?>