<?php
    $page=$_GET["page"];
    $files = scandir("../content");
    foreach ($files as $file) {
        if ($file == $page) {
            readfile("../content/".$file);
        }
    }
?>