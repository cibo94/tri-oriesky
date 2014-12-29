function ajaxCreateRequest (page, content, style) {
    this.page = page;
    this.content = content;
    this.style = style;
    this.send = (function () {
        var xmlhttp = new XMLHttpRequest(),
            body = document.getElementsByTagName("body")[0],
            loading = document.getElementById("loading"),
            content = this.content,
            style = this.style;
        loading.id = "loading";
        xmlhttp.onreadystatechange = (function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById(content).innerHTML = xmlhttp.responseText;
                loading.id = "loaded";
                body.className = style;
            }
        });
        xmlhttp.open("GET", "php/getContent.php?page=" + this.page, true);
        xmlhttp.send();
    });
};

console.log("sending");

var tmp = new ajaxCreateRequest("header.html", "header-wrapp", "content");
tmp.send();
tmp = new ajaxCreateRequest("index.html", "body-wrapp", "content");
tmp.send();
tmp = new ajaxCreateRequest("footer.html", "footer-wrapp", "content");
tmp.send();
