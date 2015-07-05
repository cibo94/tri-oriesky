<?php
    function is_regular_jpg($ext) {
        return $ext == "jpg" || $ext == "JPG";
    }
    function normalize_fn( $str ) {
        return preg_replace("/[^a-z0-9\.]/", "", strtolower($str));
    }
    $gallery_subdir = "/gallery/".$_GET["dir"]."/";
    $gallery_dir = $_SERVER['DOCUMENT_ROOT'].$gallery_subdir;
    $content = scandir($gallery_dir);
    $image_out = "";
    $directory_out = "";
    foreach ($content as $path) {
        if (is_file($gallery_dir.$path) && is_regular_jpg(substr($path, -3))) {
            $image_out .= '<a href="'.$gallery_subdir.$path.'" rel="lightbox-cast" title="'. substr($path, 0, -4) .'"><img src="'.$gallery_subdir.$path.'" alt="'. substr($path, 0, -4) .'"  class="gallery-image" hspace="20" vspace="20" /></a>';
        } elseif (is_dir($gallery_dir.$path) && $path != "." && $path != "..") {
            $directory_out .= '<h2><a href="?page=galeria.html&gal_dir='.$path.'" class="galery-button">'.$path.'</a></h2>';
        }
    }
    echo $directory_out . $image_out;
    exit(0);
 ?>
