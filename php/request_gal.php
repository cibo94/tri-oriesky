<?php
    function is_regular_jpg($ext) {
        return $ext == "jpg" || $ext == "JPG";
    }
    function normalize_fn( $str ) {
        return preg_replace("/[^a-z0-9\.]/", "", strtolower($str));
    }
    function first_image( $gallery_dir, $path ) {
        $ffi_dir = scandir($gallery_dir.$path);
        foreach ($ffi_dir as $ffi) {
            if (is_file($gallery_dir.$path.$ffi) && is_regular_jpg(substr($ffi, -3))) {
                return $ffi;
            }
        }
    }
    $gallery_subdir = "/gallery/".$_GET["dir"]."/";
    $gallery_dir = $_SERVER['DOCUMENT_ROOT'].$gallery_subdir;
    $content = scandir($gallery_dir);
    $image_out = "";
    $directory_out = "";
    foreach ($content as $path) {
        if (is_file($gallery_dir.$path) && is_regular_jpg(substr($path, -3))) {
            $image_out .= '<a href="'.$gallery_subdir.$path.'" class="button" rel="lightbox-cast" title="'. substr($path, 0, -4) .'"><img src="'.$gallery_subdir.$path.'" alt="'. substr($path, 0, -4) .'"  class="picture" hspace="20" vspace="20" /></a>';
        } elseif (is_dir($gallery_dir.$path) && $path != "." && $path != "..") {
            $first_image = first_image($gallery_dir, $path . "/");
            $directory_out .= '<a href="galeria/'.$path.'" style="background-image: url(\''.$gallery_subdir.$path."/".$first_image.'\');" class="button"><div class="nadpis">'.$path.'</div></a>';
        }
    }
    echo $directory_out . $image_out;
    exit(0);
 ?>
