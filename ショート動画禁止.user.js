// ==UserScript==
// @name         YouTubeショート動画を禁止
// @version      1.2.2
// @description  YouTubeのショート動画を禁止する。
// @match        https://www.youtube.com
// @match        https://www.youtube.com/*
// ==/UserScript==

(function (){
    "use strict";

    const REDIRECT_URL = "https://www.youtube.com/watch?v=wBf47hGMch0";
    let lastUrl = location.href;

    doAll();

    function doAll() {
        if (isShortVideo()) {
            location.replace(REDIRECT_URL);
        }
    }

    // ショート動画かどうか
    function isShortVideo() {
        return lastUrl.includes("shorts")
    }

    // URLの変化を察知
    const urlObserver = new MutationObserver(() => {
        if (lastUrl !== location.href) {
            lastUrl = location.href;
            doAll();
        }
    });
    urlObserver.observe(document, {subtree: true, childList: true});
})();