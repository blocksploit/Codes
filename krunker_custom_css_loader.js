// ==UserScript==
// @name         Krunker CSS Injector
// @namespace    https://forum.sys32.dev/
// @version      0.1
// @description  Krunker Custom CSS Injector
// @author       Blockman_#0431
// @match        *://krunker.io/*
// @icon         https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/injection.png
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// ==/UserScript==

loadCSS(localStorage.getItem("customcsslink"));

GM_registerMenuCommand("Set Custom CSS link", function() {
    var link = prompt("Enter Custom CSS link");
    localStorage.setItem("customcsslink", link);
    location.reload();
});

function loadCSS(link) {
    if (isUrl(link)) {
        GM_xmlhttpRequest({
            method: "GET",
            url: link,
            onload: function(res) {
                GM_addStyle(res.responseText);
            }
        });
    }
}

function isUrl(url) {
    try {
        new URL(url);
        return true;
    } catch(e) {
        return false;
    }
}
