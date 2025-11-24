// ==UserScript==
// @name         テスト
// @version      1.0
// @description  テスト
// @match        https://www.youtube.com
// @match        https://www.youtube.com/*
// ==/UserScript==

let lastUrl = location.href;
const observer = new MutationObserver(() => {
    if (lastUrl !== location.href) {
        lastUrl = location.href;
        window.dispatchEvent(new CustomEvent('urlChange'));
    }
});

observer.observe(document, {subtree: true, childList: true});
// 1. documentの変化を監視
// 2. 変化があるとMutationObserverのコールバックを実行(urlChangeを発火)

addEventListener("urlChange", alert("何やってるんですか？勉強してください！！"));