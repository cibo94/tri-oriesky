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
        xmlhttp.onreadystatechange = (function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById(content).innerHTML = xmlhttp.responseText;
                body.className = style;
            }
        });
        xmlhttp.open("GET", "php/getContent.php?page=" + this.page, true);
        xmlhttp.send();
    });
};

/// isFree je premenna ktora ukazuje ci sa prave nemeni opacity ak hej tak funkcia nerobi nic
/// c je pocitadlo opacity
var isFree = true, c = 50;
function goto(add) {
    if (isFree) {
        isFree = false;
        var body = document.getElementById("body-wrapp"), 
            half = false,                       // Half -> ci je pred alebo po zobrazovani kontextu
            int = setInterval(function () {     // cyklicky interval koci ked sa plne zobrazi kontext

            if (c == 0) {
                if (add == "home") {
                    tmp = new ajaxCreateRequest("header.html", "header-wrapp", "home");
                    tmp.send();
                    tmp = new ajaxCreateRequest("index.html", "body-wrapp", "home");
                    tmp.send();
                    tmp = new ajaxCreateRequest("footer.html", "footer-wrapp", "home");
                    tmp.send();
                } else {
                    tmp = new ajaxCreateRequest("header.html", "header-wrapp", "default");
                    tmp.send();
                    tmp = new ajaxCreateRequest(add, "body-wrapp", "default");
                    tmp.send();
                    tmp = new ajaxCreateRequest("footer.html", "footer-wrapp", "default");
                    tmp.send();
                }
                c++;
                half = true;
            }            
            if (!half) {
                c--;
                body.style.opacity = c / 50;
            } else if (half) {
                c++;
                body.style.opacity = c / 50;
                if (c == 50) {
                    isFree = true;
                    clearInterval(int);
                }
            }
        }, 1);
    }
}