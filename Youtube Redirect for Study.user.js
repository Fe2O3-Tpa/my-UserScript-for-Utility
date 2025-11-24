// ==UserScript==
// @name         YouTube Redirect for Study
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  特定のタイトル、URLを含むYouTube動画からリダイレクトするUserScript。
// @match        https://www.youtube.com
// @match        https://www.youtube.com*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // ★ここを書き換える：ショート動画を開いたときに遷移したいURL
    const REDIRECT_URL = "https://www.youtube.com/watch?v=wBf47hGMch0";

    // 初回実行
    Redirect();

    // YouTubeはSPAなので、URL監視が必要
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            Redirect();
        }
    }).observe(document, { subtree: true, childList: true });

    // YouTubeのタイトルを取得する関数
    function getYoutubeTitle() {
        const meta = document.querySelector('meta[name="title"]');
        if (meta && meta.content) return meta.content.trim();
            // document.title から " - YouTube" を削る
            let t = document.title || '';
        return t.replace(/\s*-\s*YouTube\s*$/, '').trim();
    }

    // shouldRedirectを使って実際にリダイレクトする
    function Redirect() {
        const url = location.href;
        // shorts のURLに来たらリダイレクト
        if (shouldRedirect()) {
            location.replace(REDIRECT_URL);
        }
    }

    // リダイレクトすべきか
    function shouldRedirect() {
        const url = location.href;
        if (url.includes("shorts")) {
            return true
        } else if (
            getYoutubeTitle().includes("勉強") | 
            getYoutubeTitle().includes("参考書") | 
            getYoutubeTitle().includes("問題") | 
            getYoutubeTitle().includes("塾") |
            getYoutubeTitle().includes("国語") |
            getYoutubeTitle().includes("数学") |
            getYoutubeTitle().includes("理科") |
            getYoutubeTitle().includes("社会") |
            getYoutubeTitle().includes("英語")
        ) {return false}
         else if (
            getYoutubeTitle().toLowerCase().includes("ch") | 
            getYoutubeTitle().includes("実況") | 
            getYoutubeTitle().includes("あるある") | 
            getYoutubeTitle().toLowerCase().includes("asmr") | 
            getYoutubeTitle().includes("激レア") | 
            getYoutubeTitle().includes("スポーツ") | 
            getYoutubeTitle().includes("レビュー") |
            getYoutubeTitle().includes("ホロライブ") | 
            getYoutubeTitle().includes("にじさんじ") | 
            getYoutubeTitle().toLowerCase().includes("vlog") | 
            getYoutubeTitle().includes("総集編") | 
            getYoutubeTitle().includes("まとめ")
        ) {
            return true
        } else return false
    }
})();
